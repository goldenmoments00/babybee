/**
 * Analytics Service Interface
 * Abstracts event tracking
 */
export class AnalyticsService {
  async trackEvent(eventName: string, payload: any): Promise<void> {
    // Abstract event tracking (e.g., to internal DB or external service)
    console.log(`[Analytics] ${eventName}`, payload);
  }
}
