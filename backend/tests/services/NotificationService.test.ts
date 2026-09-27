import { NotificationService } from '../../src/services/NotificationService';
import prisma from '../../src/utils/prisma';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    notificationLog: { findFirst: jest.fn(), create: jest.fn() }
  }
}));

describe('NotificationService (Idempotency)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('safely skips sending duplicate notification based on NotificationLog', async () => {
    (prisma.notificationLog.findFirst as jest.Mock).mockResolvedValue({ id: 'log1' });

    await NotificationService.sendOrderConfirmation('ord1');

    expect(prisma.notificationLog.findFirst).toHaveBeenCalledWith({
      where: { order_id: 'ord1', event_type: 'ORDER_CONFIRMED', channel: 'WHATSAPP', status: 'SUCCESS' }
    });
    
    // Create should NOT have been called because it already existed
    expect(prisma.notificationLog.create).not.toHaveBeenCalled();
  });

  it('sends notification and logs success in development mode', async () => {
    (prisma.notificationLog.findFirst as jest.Mock).mockResolvedValue(null);

    await NotificationService.sendOrderConfirmation('ord1');

    expect(prisma.notificationLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        order_id: 'ord1',
        event_type: 'ORDER_CONFIRMED',
        status: 'SUCCESS'
      })
    });
  });
});
