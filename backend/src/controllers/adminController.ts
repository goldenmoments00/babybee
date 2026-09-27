import { Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';
import { InventoryService } from '../services/InventoryService';
import { InventoryMovementType } from '@prisma/client';

export const getDashboardMetrics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const totalOrders = await prisma.order.count();
    const newOrders = await prisma.order.count({ where: { status: 'PENDING' } });
    
    // Sum final_amount for CONFIRMED, SHIPPED, DELIVERED
    const revenueAggr = await prisma.order.aggregate({
      _sum: { final_amount: true },
      where: { status: { in: ['CONFIRMED', 'SHIPPED', 'DELIVERED'] } }
    });
    
    const lowStockVariants = await prisma.productVariant.count({
      where: { stock: { lte: 5 } } // simple logic, in reality compare with low_stock_threshold
    });

    res.json({
      totalOrders,
      newOrders,
      revenue: revenueAggr._sum.final_amount || 0,
      lowStockAlerts: lowStockVariants
    });
  } catch (err) {
    next(err);
  }
};

export const listCustomers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      select: {
        id: true,
        email: true,
        created_at: true,
        customerProfile: true
      },
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, payment_status } = req.query;
    const where: any = {};
    if (status) where.status = status;
    
    const orders = await prisma.order.findMany({
      where,
      include: { payment: true },
      take: 50,
      orderBy: { created_at: 'desc' }
    });

    if (payment_status) {
      // Filter in memory for Phase 5 to keep schema simple since payment is a relation
      const filtered = orders.filter(o => o.payment?.status === payment_status);
      return res.json(filtered);
    }

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getAdminOrderDetail = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { orderNumber } = req.params;
    const order = await prisma.order.findFirst({
      where: { order_number: orderNumber },
      include: {
        user: { select: { id: true, email: true } },
        shippingAddress: true,
        items: true,
        payment: true,
        history: { orderBy: { created_at: 'desc' } }
      }
    });

    if (!order) return res.status(404).json({ error: { message: 'Order not found' } });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { orderNumber } = req.params;
    const { status, notes } = req.body;
    const adminId = req.user!.id;

    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: { message: 'Invalid order status' } });
    }

    const order = await prisma.order.findFirst({ where: { order_number: orderNumber } });
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } });

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { status }
      });

      await tx.orderStatusHistory.create({
        data: {
          order_id: order.id,
          status,
          notes,
          changed_by: adminId
        }
      });
    });

    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const adjustInventory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { variant_id, quantity, type, notes } = req.body;
    const adminId = req.user!.id;

    if (!['IN', 'OUT', 'ADJUST'].includes(type)) {
      return res.status(400).json({ error: { message: 'Invalid movement type' } });
    }
    
    if (quantity < 0) {
        return res.status(400).json({ error: { message: 'Quantity must be non-negative' } });
    }

    const finalNotes = notes ? `${notes} (By Admin: ${adminId})` : `Adjusted by Admin: ${adminId}`;

    const newStock = await InventoryService.adjustStock(
      variant_id, 
      Number(quantity), 
      type as InventoryMovementType, 
      finalNotes
    );

    res.json({ message: 'Inventory adjusted successfully', stock: newStock });
  } catch (err: any) {
    res.status(400).json({ error: { message: err.message } });
  }
};
