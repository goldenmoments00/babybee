import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';

export const createAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { type, street, city, state, pin_code, country, is_default } = req.body;

    // Basic validation
    if (!street || !city || !state || !pin_code || !country) {
      return res.status(400).json({ error: { message: 'All address fields are required' } });
    }

    if (is_default) {
      // Unset other default addresses for this user
      await prisma.address.updateMany({
        where: { user_id: userId },
        data: { is_default: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        user_id: userId,
        type: type || 'shipping',
        street,
        city,
        state,
        pin_code,
        country,
        is_default: is_default || false
      }
    });

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};

export const getAddresses = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const addresses = await prisma.address.findMany({
      where: { user_id: userId },
      orderBy: { is_default: 'desc' }
    });
    res.json(addresses);
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    // Security: Only owner can delete their address
    const address = await prisma.address.findFirst({
      where: { id, user_id: userId }
    });

    if (!address) {
      return res.status(404).json({ error: { message: 'Address not found or unauthorized' } });
    }

    await prisma.address.delete({ where: { id } });
    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    next(err);
  }
};
