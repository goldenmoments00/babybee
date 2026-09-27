import { InventoryService } from '../../src/services/InventoryService';
import prisma from '../../src/utils/prisma';
import { InventoryMovementType } from '@prisma/client';

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    productVariant: {
      findUnique: jest.fn(),
    }
  }
}));

describe('InventoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isLowStock', () => {
    it('returns true if stock is at or below threshold', async () => {
      (prisma.productVariant.findUnique as jest.Mock).mockResolvedValue({
        id: '1',
        stock: 5,
        low_stock_threshold: 10
      });

      const result = await InventoryService.isLowStock('1');
      expect(result).toBe(true);
    });

    it('returns false if stock is above threshold', async () => {
      (prisma.productVariant.findUnique as jest.Mock).mockResolvedValue({
        id: '1',
        stock: 15,
        low_stock_threshold: 10
      });

      const result = await InventoryService.isLowStock('1');
      expect(result).toBe(false);
    });
  });
});
