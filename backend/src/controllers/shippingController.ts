import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';
import { ShippingService } from '../services/ShippingService';
import { NotificationService } from '../services/NotificationService';

export const shippingWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tracking_number, status, signature } = req.body;
    const payload = JSON.stringify(req.body);
    const secret = process.env.SHIPPING_WEBHOOK_SECRET || 'dev_secret';

    // Verify signature (if in production)
    if (process.env.NODE_ENV === 'production') {
      const isValid = ShippingService.verifyWebhookSignature(payload, signature, secret);
      if (!isValid) return res.status(401).send('Invalid signature');
    }

    // Find shipment
    const shipment = await prisma.shipment.findFirst({ where: { tracking_number } });
    if (!shipment) return res.status(404).send('Shipment not found');

    // Idempotency: Skip if already at the exact same status
    if (shipment.status === status) {
      return res.status(200).send('Already processed');
    }

    const validStatuses = ['PENDING', 'READY', 'SHIPPED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'RETURNED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).send('Invalid status');
    }

    await prisma.$transaction(async (tx) => {
      await tx.shipment.update({
        where: { id: shipment.id },
        data: { 
          status,
          shipped_at: status === 'SHIPPED' ? new Date() : undefined,
          delivered_at: status === 'DELIVERED' ? new Date() : undefined
        }
      });

      // Also map it to OrderStatusHistory for customer tracking timeline if applicable
      let mappedOrderStatus = null;
      if (status === 'SHIPPED') mappedOrderStatus = 'SHIPPED';
      if (status === 'OUT_FOR_DELIVERY') mappedOrderStatus = 'OUT_FOR_DELIVERY';
      if (status === 'DELIVERED') mappedOrderStatus = 'DELIVERED';

      if (mappedOrderStatus) {
        // Prevent duplicate order status
        const lastStatus = await tx.orderStatusHistory.findFirst({
          where: { order_id: shipment.order_id },
          orderBy: { created_at: 'desc' }
        });

        if (lastStatus?.status !== mappedOrderStatus) {
          await tx.order.update({
            where: { id: shipment.order_id },
            data: { status: mappedOrderStatus }
          });
          
          await tx.orderStatusHistory.create({
            data: {
              order_id: shipment.order_id,
              status: mappedOrderStatus,
              notes: `Courier status: ${status}`
            }
          });
        }
      }
    });

    // Notify customer
    if (status === 'SHIPPED' && shipment.tracking_url) {
      await NotificationService.sendShipmentUpdate(shipment.order_id, shipment.tracking_url);
    }

    res.status(200).send('Webhook processed');
  } catch (err) {
    next(err);
  }
};

export const adminCreateShipment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { orderNumber } = req.params;
    
    const order = await prisma.order.findFirst({ where: { order_number: orderNumber } });
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } });

    const shipment = await ShippingService.createShipment(order.id, 'MOCK_COURIER');
    
    res.json({ message: 'Shipment created successfully', shipment });
  } catch (err) {
    next(err);
  }
};
