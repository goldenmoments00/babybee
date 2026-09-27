import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';
import { InventoryMovementType } from '@prisma/client';
import { PaymentService } from '../services/PaymentService';
import crypto from 'crypto';

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { items, shipping_address_id, billing_address_id } = req.body;
    // items: [{ variant_id: string, quantity: number }]

    if (!items || !items.length) {
      return res.status(400).json({ error: { message: 'Order must contain items' } });
    }

    // Security: Verify addresses belong to the user
    const addressCheck = await prisma.address.findMany({
      where: {
        id: { in: [shipping_address_id, billing_address_id] },
        user_id: userId
      }
    });

    if (addressCheck.length === 0) {
      return res.status(403).json({ error: { message: 'Invalid or unauthorized addresses' } });
    }

    // Generate unique order number
    const orderNumber = `BB-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    // Execute in an isolated transaction to prevent race conditions & overselling
    const order = await prisma.$transaction(async (tx) => {
      let totalItemsAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        // Find active variant with product included
        const variant = await tx.productVariant.findFirst({
          where: { id: item.variant_id, status: 'ACTIVE', deleted_at: null },
          include: { product: true }
        });

        if (!variant) {
          throw new Error(`Variant ${item.variant_id} is unavailable or does not exist`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${variant.product.name} (SKU: ${variant.sku})`);
        }

        const priceAtTime = Number(variant.price);
        const lineTotal = priceAtTime * item.quantity;
        totalItemsAmount += lineTotal;

        // Deduct inventory immediately to prevent race conditions
        await tx.productVariant.update({
          where: { id: variant.id },
          data: { stock: { decrement: item.quantity } }
        });

        // Log inventory movement
        await tx.inventoryMovement.create({
          data: {
            variant_id: variant.id,
            type: InventoryMovementType.OUT,
            quantity: item.quantity,
            notes: `Order created: ${orderNumber}`
          }
        });

        // Snapshot data
        orderItemsData.push({
          variant_id: variant.id,
          product_name_snapshot: variant.product.name,
          variant_sku_snapshot: variant.sku,
          quantity: item.quantity,
          price_at_time: priceAtTime,
          total_price: lineTotal
        });
      }

      const shippingCharge = totalItemsAmount > 2000 ? 0 : 100; // Mock rule: free shipping above 2000
      const finalAmount = totalItemsAmount + shippingCharge;

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          user_id: userId,
          order_number: orderNumber,
          total_amount: totalItemsAmount,
          shipping_amount: shippingCharge,
          final_amount: finalAmount,
          status: 'PENDING',
          shipping_address_id,
          billing_address_id,
          items: {
            create: orderItemsData
          },
          history: {
            create: [{ status: 'PENDING', notes: 'Order placed' }]
          }
        },
        include: { items: true }
      });

      // Initiate Payment
      const paymentInit = await PaymentService.initiatePayment(newOrder.id, finalAmount, userId);

      await tx.payment.create({
        data: {
          order_id: newOrder.id,
          payment_method: 'GATEWAY',
          amount: finalAmount,
          status: 'PENDING',
          transaction_id: paymentInit.transactionId
        }
      });

      return { ...newOrder, paymentUrl: paymentInit.mockPaymentUrl };
    });

    res.status(201).json(order);
  } catch (err: any) {
    if (err.message.includes('Insufficient stock') || err.message.includes('unavailable')) {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
};

export const getCustomerOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: {
        payment: true,
        items: true
      }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getCustomerOrderDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { orderNumber } = req.params;

    // Security: Bound query tightly to user_id
    const order = await prisma.order.findFirst({
      where: { order_number: orderNumber, user_id: userId },
      include: {
        items: true,
        payment: true,
        shippingAddress: true,
        history: { orderBy: { created_at: 'desc' } }
      }
    });

    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found or unauthorized' } });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const paymentWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { transaction_id, event, status } = req.body;
    
    // IDEMPOTENCY: Handle duplicate webhooks
    const payment = await prisma.payment.findFirst({ where: { transaction_id } });
    if (!payment) return res.status(404).send('Transaction not found');
    if (payment.status === 'PAID' && status === 'PAID') {
      return res.status(200).send('Already processed');
    }

    // Use transaction for safe status updates
    await prisma.$transaction(async (tx) => {
      if (status === 'PAID') {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: 'PAID' }
        });
        
        await tx.order.update({
          where: { id: payment.order_id },
          data: { status: 'CONFIRMED' }
        });

        await tx.orderStatusHistory.create({
          data: { order_id: payment.order_id, status: 'CONFIRMED', notes: 'Payment verified' }
        });
      }
    });

    res.status(200).send('Webhook processed');
  } catch (err) {
    next(err);
  }
};
