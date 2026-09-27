import { ShippingService } from '../../src/services/ShippingService';
import prisma from '../../src/utils/prisma';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    shipment: { upsert: jest.fn() }
  }
}));

describe('ShippingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('abstracts creation of a shipment without locking into a provider', async () => {
    (prisma.shipment.upsert as jest.Mock).mockResolvedValue({ id: 'ship1', status: 'READY' });
    
    await ShippingService.createShipment('ord1', 'DELIVERY_PRO');
    
    expect(prisma.shipment.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { order_id: 'ord1' },
        create: expect.objectContaining({ courier_name: 'DELIVERY_PRO', status: 'READY' }),
        update: expect.objectContaining({ courier_name: 'DELIVERY_PRO', status: 'READY' })
      })
    );
  });

  it('safely fails webhook signature verification if no secret is configured', () => {
    const result = ShippingService.verifyWebhookSignature('payload', 'sig', '');
    expect(result).toBe(false);
  });
});
