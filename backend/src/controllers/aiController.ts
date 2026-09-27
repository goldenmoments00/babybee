import { Request, Response, NextFunction } from 'express';
import { AiService } from '../services/AiService';
import { AuthRequest } from '../middlewares/auth';
import jwt from 'jsonwebtoken';

// In-memory rate limiting for Phase 7 (Session-based)
const rateLimits = new Map<string, { count: number, resetAt: number }>();

export const chatWithBeeBuddy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.length > 500) {
      return res.status(400).json({ error: { message: 'Message must be between 1 and 500 characters.' } });
    }

    // Optional Authentication extraction (Don't enforce hard 401 because guests can chat)
    let userId: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret') as any;
        userId = decoded.id;
      } catch (err) {
        // Ignore invalid tokens for AI chat, just treat as guest
      }
    }

    const ip = req.ip || 'unknown';
    const limitKey = userId || ip;

    // Rate Limiting Logic (Max 10 requests per minute per IP/User)
    const now = Date.now();
    const windowMs = 60000;
    const maxRequests = 10;

    let limitRecord = rateLimits.get(limitKey);
    if (!limitRecord || limitRecord.resetAt < now) {
      limitRecord = { count: 1, resetAt: now + windowMs };
    } else {
      limitRecord.count += 1;
    }
    rateLimits.set(limitKey, limitRecord);

    if (limitRecord.count > maxRequests) {
      return res.status(429).json({ error: { message: 'Too many requests. Please slow down.' } });
    }

    // Generate Response
    const response = await AiService.generateResponse(message, userId);
    
    res.json({ response });
  } catch (err: any) {
    if (err.message.includes('unavailable')) {
      return res.status(503).json({ error: { message: 'BeeBuddy is temporarily unavailable. Please try again later.' } });
    }
    next(err);
  }
};
