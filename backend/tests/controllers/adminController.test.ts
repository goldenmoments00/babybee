import { updateOrderStatus, adjustInventory } from '../../src/controllers/adminController';
import prisma from '../../src/utils/prisma';
import { Request, Response } from 'express';
import { AuthRequest, requireRole } from '../../src/middlewares/auth';
import { InventoryService } from '../../src/services/InventoryService';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    order: { findFirst: jest.fn(), update: jest.fn() },
    orderStatusHistory: { create: jest.fn() },
    user: { findMany: jest.fn() }
  }
}));

jest.mock('../../src/services/InventoryService', () => ({
  InventoryService: { adjustStock: jest.fn() }
}));

describe('AdminController & Security', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      user: { id: 'admin1', role: 'ADMIN' },
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

  describe('RBAC Middleware', () => {
    it('CUSTOMER cannot access admin APIs', () => {
      mockReq.user = { id: 'cust1', role: 'CUSTOMER' };
      const middleware = requireRole(['ADMIN', 'SUPER_ADMIN']);
      middleware(mockReq as AuthRequest, mockRes as Response, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('ADMIN can access permitted admin APIs', () => {
      mockReq.user = { id: 'admin1', role: 'ADMIN' };
      const middleware = requireRole(['ADMIN', 'SUPER_ADMIN']);
      middleware(mockReq as AuthRequest, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('Order Management', () => {
    it('Unauthorized order status transition is rejected', async () => {
      mockReq.params = { orderNumber: 'BB-123' };
      mockReq.body = { status: 'INVALID_STATUS' };
      
      await updateOrderStatus(mockReq as AuthRequest, mockRes as Response, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Invalid order status' } });
    });

    it('Valid order status transition succeeds', async () => {
      mockReq.params = { orderNumber: 'BB-123' };
      mockReq.body = { status: 'SHIPPED', notes: 'Dispatched' };
      (prisma.order.findFirst as jest.Mock).mockResolvedValue({ id: 'ord1', status: 'PROCESSING' });
      (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => {
        return cb(prisma);
      });

      await updateOrderStatus(mockReq as AuthRequest, mockRes as Response, mockNext);
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'ord1' },
        data: { status: 'SHIPPED' }
      });
      expect(prisma.orderStatusHistory.create).toHaveBeenCalledWith({
        data: {
          order_id: 'ord1',
          status: 'SHIPPED',
          notes: 'Dispatched',
          changed_by: 'admin1'
        }
      });
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Order status updated successfully' });
    });
  });

  describe('Inventory Management', () => {
    it('Unauthorized inventory manipulation is rejected (invalid type)', async () => {
      mockReq.body = { variant_id: 'var1', quantity: 10, type: 'HACK' };
      await adjustInventory(mockReq as AuthRequest, mockRes as Response, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('Authorized inventory adjustment updates stock and logs movement', async () => {
      mockReq.body = { variant_id: 'var1', quantity: 10, type: 'IN', notes: 'Restock' };
      (InventoryService.adjustStock as jest.Mock).mockResolvedValue(15);

      await adjustInventory(mockReq as AuthRequest, mockRes as Response, mockNext);
      
      expect(InventoryService.adjustStock).toHaveBeenCalledWith(
        'var1', 10, 'IN', 'Restock (By Admin: admin1)'
      );
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Inventory adjusted successfully', stock: 15 });
    });
  });
});
