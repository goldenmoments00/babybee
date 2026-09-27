import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, description, base_price, subcategory_id, variants } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        base_price,
        subcategory_id,
        variants: {
          create: variants // Array of variant objects
        }
      },
      include: { variants: true }
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Lightweight fetch for mobile-first catalog
export const listProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only return active and non-deleted products
    const products = await prisma.product.findMany({
      where: { 
        status: 'ACTIVE',
        deleted_at: null 
      },
      select: {
        id: true,
        name: true,
        slug: true,
        base_price: true,
        images: { where: { is_primary: true }, take: 1 } // Only fetch primary image for listing
      },
      take: 20 // basic pagination
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findFirst({
      where: { slug, deleted_at: null },
      include: {
        images: true,
        variants: {
          where: { deleted_at: null },
          include: { attributes: true }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const softDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    await prisma.product.update({
      where: { id },
      data: { deleted_at: new Date(), status: 'ARCHIVED' }
    });

    // Also archive variants
    await prisma.productVariant.updateMany({
      where: { product_id: id },
      data: { deleted_at: new Date(), status: 'ARCHIVED' }
    });

    res.json({ message: 'Product archived successfully' });
  } catch (err) {
    next(err);
  }
};
