import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, description, image_url } = req.body;
    
    // Check if exists
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ error: { message: 'Category slug already exists' } });
    }

    const category = await prisma.category.create({
      data: { name, slug, description, image_url }
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      where: { is_active: true },
      include: { subcategories: { where: { is_active: true } } }
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const category = await prisma.category.update({
      where: { id },
      data
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const createSubcategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_id, name, slug } = req.body;
    
    const existing = await prisma.subcategory.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ error: { message: 'Subcategory slug already exists' } });
    }

    const sub = await prisma.subcategory.create({
      data: { category_id, name, slug }
    });
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
};
