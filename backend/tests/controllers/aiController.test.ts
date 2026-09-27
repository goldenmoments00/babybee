import { chatWithBeeBuddy } from '../../src/controllers/aiController';
import { AiService } from '../../src/services/AiService';
import { Request, Response } from 'express';

jest.mock('../../src/services/AiService', () => ({
  AiService: { generateResponse: jest.fn() }
}));

describe('AiController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      body: { message: 'Hello' },
      headers: {},
      ip: '127.0.0.1'
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('rejects oversized messages', async () => {
    mockReq.body.message = 'a'.repeat(501);
    await chatWithBeeBuddy(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it('rate limits requests correctly', async () => {
    Object.defineProperty(mockReq, 'ip', { value: '192.168.1.1' });
    
    // Simulate 11 requests
    for (let i = 0; i < 11; i++) {
      await chatWithBeeBuddy(mockReq as Request, mockRes as Response, mockNext);
    }
    
    expect(mockRes.status).toHaveBeenCalledWith(429);
    expect(mockRes.json).toHaveBeenCalledWith({ error: { message: 'Too many requests. Please slow down.' } });
  });

  it('calls AiService and returns response', async () => {
    Object.defineProperty(mockReq, 'ip', { value: '10.0.0.1' }); // New IP to avoid rate limit leak from previous test
    (AiService.generateResponse as jest.Mock).mockResolvedValue('Hello there!');
    
    await chatWithBeeBuddy(mockReq as Request, mockRes as Response, mockNext);
    
    expect(AiService.generateResponse).toHaveBeenCalledWith('Hello', undefined);
    expect(mockRes.json).toHaveBeenCalledWith({ response: 'Hello there!' });
  });
});
