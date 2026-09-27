import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';

export const setupSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, setupKey } = req.body;

    // Secure mechanism: require an env SETUP_KEY to seed super admin
    const EXPECTED_SETUP_KEY = process.env.SETUP_KEY;
    if (!EXPECTED_SETUP_KEY || setupKey !== EXPECTED_SETUP_KEY) {
      return res.status(403).json({ error: { message: 'Forbidden: Invalid setup key' } });
    }

    const existingAdmin = await prisma.user.findFirst({
      where: { role: Role.SUPER_ADMIN }
    });

    if (existingAdmin) {
      return res.status(400).json({ error: { message: 'Super Admin already exists' } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        role: Role.SUPER_ADMIN
      }
    });

    res.status(201).json({ message: 'Super Admin created successfully', userId: admin.id });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: { message: 'Email and password are required' } });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};
