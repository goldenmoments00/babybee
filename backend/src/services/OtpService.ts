/**
 * OTP Service Interface
 * Abstracts the OTP provider (e.g., Fast2SMS, Twilio)
 */
export class OtpService {
  async sendOtp(phone: string): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async verifyOtp(phone: string, otp: string): Promise<boolean> {
    throw new Error('Not implemented');
  }
}
