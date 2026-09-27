import prisma from '../utils/prisma';

export class ShippingService {
  /**
   * Abstracted method to create a shipment with a generic provider
   */
  static async createShipment(orderId: string, providerName: string = 'MOCK_COURIER') {
    const shipmentId = `SHIP-${Date.now()}`;
    const trackingNumber = `TRK-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Development mode simulation - do not contact real API if not configured
    const isDev = !process.env.SHIPPING_API_KEY;

    if (isDev) {
      console.log(`[DEVELOPMENT MODE] Shipment created for order: ${orderId} via ${providerName}`);
    }

    return await prisma.shipment.upsert({
      where: { order_id: orderId },
      update: {
        courier_name: providerName,
        tracking_number: trackingNumber,
        tracking_url: `https://track.mockcourier.com/${trackingNumber}`,
        status: 'READY'
      },
      create: {
        order_id: orderId,
        courier_name: providerName,
        tracking_number: trackingNumber,
        tracking_url: `https://track.mockcourier.com/${trackingNumber}`,
        status: 'READY'
      }
    });
  }

  /**
   * Verifies the provider signature for webhooks
   */
  static verifyWebhookSignature(payload: string, signature: string, secret: string) {
    if (!secret) return false; // Fail safe if no secret configured
    
    const crypto = require('crypto');
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return expected === signature;
  }
}
