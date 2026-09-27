import { authenticate, requireRole } from '../../src/middlewares/auth';
import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('authenticate() blocks request without token', () => {
    authenticate(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(401);
  });

  it('requireRole() blocks request without sufficient privileges', () => {
    mockReq = {
      user: { id: '1', role: Role.CUSTOMER }
    } as any;

    const middleware = requireRole(['ADMIN', 'SUPER_ADMIN']);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
  });

  it('requireRole() allows request with valid role', () => {
    mockReq = {
      user: { id: '1', role: Role.ADMIN }
    } as any;

    const middleware = requireRole(['ADMIN', 'SUPER_ADMIN']);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
