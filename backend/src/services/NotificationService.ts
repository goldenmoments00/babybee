import prisma from '../utils/prisma';

export class NotificationService {
  /**
   * Generic notification dispatcher
   */
  static async sendNotification(orderId: string, eventType: string, channel: 'WHATSAPP' | 'EMAIL' | 'SMS', payload: any) {
    // IDEMPOTENCY CHECK
    const existing = await prisma.notificationLog.findFirst({
      where: { order_id: orderId, event_type: eventType, channel: channel, status: 'SUCCESS' }
    });

    if (existing) {
      console.log(`[IDEMPOTENCY] Notification for ${eventType} on ${channel} for order ${orderId} already sent. Skipping.`);
      return;
    }

    const isDev = !process.env.WHATSAPP_API_KEY && !process.env.EMAIL_API_KEY;

    let logStatus = 'SUCCESS';
    let errorMessage = null;

    if (isDev) {
      console.log(`[DEVELOPMENT MODE] NOTIFICATION NOT SENT — Event: ${eventType} | Channel: ${channel} | Order: ${orderId}`);
    } else {
      // In production, call real provider adapters here
      try {
        if (channel === 'WHATSAPP') {
          // call WhatsApp Adapter
        } else if (channel === 'EMAIL') {
          // call Email Adapter
        }
      } catch (err: any) {
        logStatus = 'FAILED';
        errorMessage = err.message;
      }
    }

    // Log the notification
    await prisma.notificationLog.create({
      data: {
        order_id: orderId,
        event_type: eventType,
        channel: channel,
        status: logStatus,
        error: errorMessage,
        sent_at: logStatus === 'SUCCESS' ? new Date() : null
      }
    });
  }

  static async sendOrderConfirmation(orderId: string) {
    await this.sendNotification(orderId, 'ORDER_CONFIRMED', 'WHATSAPP', { message: 'Your order is confirmed' });
  }

  static async sendShipmentUpdate(orderId: string, trackingUrl: string) {
    await this.sendNotification(orderId, 'ORDER_SHIPPED', 'WHATSAPP', { message: `Your order has shipped. Track here: ${trackingUrl}` });
  }
}
