import { createOrder, paymentWebhook } from '../../src/controllers/orderController';
import prisma from '../../src/utils/prisma';
import { Request, Response } from 'express';
import { AuthRequest } from '../../src/middlewares/auth';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    address: { findMany: jest.fn() },
    payment: { findFirst: jest.fn() },
    order: { findFirst: jest.fn() },
  }
}));

describe('OrderController', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      user: { id: 'user1', role: 'CUSTOMER' },
      body: {
        items: [{ variant_id: 'var1', quantity: 2 }],
        shipping_address_id: 'add1',
        billing_address_id: 'add1'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('rejects order if address is unauthorized or invalid', async () => {
    (prisma.address.findMany as jest.Mock).mockResolvedValue([]);
    
    await createOrder(mockReq as AuthRequest, mockRes as Response, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Invalid or unauthorized addresses' } });
  });

  it('processes payment webhook idempotently', async () => {
    mockReq.body = { transaction_id: 'TXN1', status: 'PAID' };
    
    // Simulate transaction already marked PAID
    (prisma.payment.findFirst as jest.Mock).mockResolvedValue({ id: 'pay1', status: 'PAID' });

    await paymentWebhook(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith('Already processed');
  });
});
