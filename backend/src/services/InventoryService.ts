import prisma from '../utils/prisma';
import { InventoryMovementType } from '@prisma/client';

export class InventoryService {
  /**
   * Add or subtract stock and log movement
   */
  static async adjustStock(variantId: string, quantity: number, type: InventoryMovementType, notes?: string, referenceId?: string) {
    return prisma.$transaction(async (tx) => {
      // Find variant
      const variant = await tx.productVariant.findUnique({ where: { id: variantId } });
      if (!variant) throw new Error('Variant not found');

      let newStock = variant.stock;
      if (type === InventoryMovementType.IN) newStock += quantity;
      else if (type === InventoryMovementType.OUT) newStock -= quantity;
      else if (type === InventoryMovementType.ADJUST) newStock = quantity; // Absolute set

      if (newStock < 0) throw new Error('Insufficient stock');

      // Update variant stock
      await tx.productVariant.update({
        where: { id: variantId },
        data: { stock: newStock }
      });

      // Log movement
      await tx.inventoryMovement.create({
        data: {
          variant_id: variantId,
          type,
          quantity,
          notes,
          reference_id: referenceId
        }
      });

      return newStock;
    });
  }

  static async isLowStock(variantId: string) {
    const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!variant) return false;
    return variant.stock <= variant.low_stock_threshold;
  }
}
