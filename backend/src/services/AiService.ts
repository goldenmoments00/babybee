import prisma from '../utils/prisma';

export class AiService {
  /**
   * Generates a response based on customer input and context.
   * If a real provider (like OpenAI/Gemini) is not configured, it falls back to Mock mode.
   */
  static async generateResponse(message: string, userId?: string): Promise<string> {
    const isDev = !process.env.AI_PROVIDER_API_KEY;

    if (isDev) {
      return this.mockProviderResponse(message, userId);
    }

    // Provider logic would go here. We would parse intent, call tools, and return the response.
    // For now, if somehow it reaches here without an implementation, fail safely.
    throw new Error('AI Provider not implemented yet.');
  }

  /**
   * Safe backend tool: Search Products
   */
  static async searchProducts(query: string) {
    return await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ],
        status: 'ACTIVE',
        deleted_at: null
      },
      take: 3,
      select: { name: true, base_price: true, slug: true }
    });
  }

  /**
   * Safe backend tool: Get Order Status
   */
  static async getOrderDetails(orderNumber: string, userId: string) {
    const order = await prisma.order.findFirst({
      where: { order_number: orderNumber, user_id: userId },
      select: { status: true, total_amount: true, created_at: true }
    });
    if (!order) return null;
    return order;
  }

  /**
   * Mock Development Mode Response
   */
  private static async mockProviderResponse(message: string, userId?: string): Promise<string> {
    const lower = message.toLowerCase();

    if (lower.includes('order')) {
      if (!userId) return "[Mock Mode] Please log in to check your order status.";
      const recentOrder = await prisma.order.findFirst({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        select: { order_number: true, status: true }
      });
      if (recentOrder) {
        return `[Mock Mode] Your most recent order ${recentOrder.order_number} is currently ${recentOrder.status}.`;
      }
      return "[Mock Mode] I couldn't find any recent orders for your account.";
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('onesie')) {
      const products = await this.searchProducts('onesie');
      if (products.length > 0) {
        return `[Mock Mode] We have ${products[0].name} starting at ₹${products[0].base_price}.`;
      }
      return "[Mock Mode] I couldn't find pricing for that right now.";
    }

    return "[Mock Mode] Hi! I'm BeeBuddy. How can I help you with BabyBee products today? (Configure AI_PROVIDER_API_KEY for real responses).";
  }
}
