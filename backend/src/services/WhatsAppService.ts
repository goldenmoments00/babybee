/**
 * WhatsApp Service Interface
 * Abstracts the underlying WhatsApp provider (e.g., Interakt, Wati, Meta)
 */
export class WhatsAppService {
  async sendOrderConfirmation(customerPhone: string, orderDetails: any): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async sendShippingUpdate(customerPhone: string, trackingInfo: any): Promise<boolean> {
    throw new Error('Not implemented');
  }
}
