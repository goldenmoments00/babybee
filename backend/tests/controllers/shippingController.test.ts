import { shippingWebhook, adminCreateShipment } from '../../src/controllers/shippingController';
import prisma from '../../src/utils/prisma';
import { Request, Response } from 'express';
import { AuthRequest, requireRole } from '../../src/middlewares/auth';
import { NotificationService } from '../../src/services/NotificationService';
import { ShippingService } from '../../src/services/ShippingService';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    shipment: { findFirst: jest.fn(), update: jest.fn() },
    order: { findFirst: jest.fn(), update: jest.fn() },
    orderStatusHistory: { findFirst: jest.fn(), create: jest.fn() }
  }
}));

jest.mock('../../src/services/NotificationService', () => ({
  NotificationService: { sendShipmentUpdate: jest.fn() }
}));

jest.mock('../../src/services/ShippingService', () => ({
  ShippingService: { verifyWebhookSignature: jest.fn(), createShipment: jest.fn() }
}));

describe('ShippingController Webhook & Admin', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('invalid shipping webhook status is rejected', async () => {
    mockReq.body = { tracking_number: 'TRK1', status: 'HACKED' };
    (prisma.shipment.findFirst as jest.Mock).mockResolvedValue({ id: 'ship1', status: 'PENDING' });

    await shippingWebhook(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Invalid status');
  });

  it('valid shipping webhook updates shipment and maps to order status', async () => {
    mockReq.body = { tracking_number: 'TRK1', status: 'SHIPPED' };
    (prisma.shipment.findFirst as jest.Mock).mockResolvedValue({ id: 'ship1', order_id: 'ord1', status: 'PENDING', tracking_url: 'http' });
    
    (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => {
      return cb(prisma);
    });
    
    // Simulate mapping behavior
    (prisma.orderStatusHistory.findFirst as jest.Mock).mockResolvedValue(null);

    await shippingWebhook(mockReq as Request, mockRes as Response, mockNext);

    expect(prisma.shipment.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'ship1' },
      data: expect.objectContaining({ status: 'SHIPPED' })
    }));

    // Check order mapping
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: 'ord1' },
      data: { status: 'SHIPPED' }
    });

    // Check notification fired
    expect(NotificationService.sendShipmentUpdate).toHaveBeenCalledWith('ord1', 'http');
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('duplicate shipping webhook is idempotent', async () => {
    mockReq.body = { tracking_number: 'TRK1', status: 'SHIPPED' };
    (prisma.shipment.findFirst as jest.Mock).mockResolvedValue({ id: 'ship1', order_id: 'ord1', status: 'SHIPPED' }); // Already SHIPPED

    await shippingWebhook(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith('Already processed');
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('Admin can authorize shipment creation', async () => {
    mockReq.user = { id: 'admin1', role: 'ADMIN' };
    mockReq.params = { orderNumber: 'BB-123' };
    
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({ id: 'ord1', order_number: 'BB-123' });
    (ShippingService.createShipment as jest.Mock).mockResolvedValue({ id: 'ship1', status: 'READY' });

    await adminCreateShipment(mockReq as AuthRequest, mockRes as Response, mockNext);

    expect(ShippingService.createShipment).toHaveBeenCalledWith('ord1', 'MOCK_COURIER');
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Shipment created successfully' }));
  });
});
