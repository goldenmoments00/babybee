import { AiService } from '../../src/services/AiService';
import prisma from '../../src/utils/prisma';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    product: { findMany: jest.fn() },
    order: { findFirst: jest.fn() }
  }
}));

describe('AiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searchProducts safely searches catalogue without exposing internals', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([{ name: 'Onesie', base_price: 500 }]);
    
    const res = await AiService.searchProducts('onesie');
    expect(prisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ status: 'ACTIVE' }),
      select: { name: true, base_price: true, slug: true }
    }));
    expect(res[0].name).toBe('Onesie');
  });

  it('getOrderDetails securely mandates userId to fetch order status', async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({ status: 'SHIPPED' });
    
    await AiService.getOrderDetails('BB-123', 'user1');
    expect(prisma.order.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: { order_number: 'BB-123', user_id: 'user1' }
    }));
  });

  it('mock mode falls back correctly based on keywords', async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue({ order_number: 'BB-1', status: 'DELIVERED' });
    
    const res = await AiService.generateResponse('where is my order?', 'user1');
    expect(res).toContain('BB-1');
    expect(res).toContain('DELIVERED');
  });
});
