const { calculateTotalPrice } = require('./index');

describe('calculateTotalPrice - C2 Branch Coverage Testing', () => {
  describe('Điểm quyết định (1): unitPrice <= 0 || quantity <= 0 - Kiểm tra input hợp lệ', () => {
    
    test('Nhánh TRUE: unitPrice <= 0 (invalid input)', () => {
      const result = calculateTotalPrice(0, 10);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('Nhánh TRUE: quantity <= 0 (invalid input)', () => {
      const result = calculateTotalPrice(100, 0);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('Nhánh TRUE: cả hai đều <= 0 (invalid input)', () => {
      const result = calculateTotalPrice(-10, -5);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('Nhánh FALSE: input hợp lệ (unitPrice > 0 và quantity > 0)', () => {
      const result = calculateTotalPrice(100, 3);
      expect(result.totalPrice).toBeGreaterThan(0);
      expect(result.message).not.toBe("Invalid input values");
    });
  });

  describe('Điểm quyết định (2): quantity >= 10 - Kiểm tra giảm giá 20%', () => {
    
    test('Nhánh TRUE: quantity >= 10 (20% discount)', () => {
      const result = calculateTotalPrice(100, 10);
      expect(result.totalPrice).toBe(800); // 100 * 10 * 0.8
      expect(result.message).toBe("20% discount");
    });

    test('Nhánh TRUE: quantity > 10 (20% discount)', () => {
      const result = calculateTotalPrice(100, 15);
      expect(result.totalPrice).toBe(1200); // 100 * 15 * 0.8
      expect(result.message).toBe("20% discount");
    });

    test('Nhánh FALSE: quantity < 10 (không phải 20% discount)', () => {
      const result = calculateTotalPrice(100, 9);
      // Sẽ rơi vào điều kiện tiếp theo hoặc no discount
      expect(result.totalPrice).not.toBe(720); // không phải 20%
    });
  });

  describe('Điểm quyết định (3): quantity >= 5 - Kiểm tra giảm giá 10%', () => {
    
    test('Nhánh TRUE: quantity >= 5 và < 10 (10% discount)', () => {
      const result = calculateTotalPrice(100, 5);
      expect(result.totalPrice).toBe(450); // 100 * 5 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('Nhánh TRUE: quantity = 7 (10% discount)', () => {
      const result = calculateTotalPrice(100, 7);
      expect(result.totalPrice).toBe(630); // 100 * 7 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('Nhánh FALSE: quantity < 5 (no discount)', () => {
      const result = calculateTotalPrice(100, 4);
      expect(result.totalPrice).toBe(400); // 100 * 4 * 1.0
      expect(result.message).toBe("No discount");
    });

    test('Nhánh FALSE: quantity = 1 (no discount)', () => {
      const result = calculateTotalPrice(50, 1);
      expect(result.totalPrice).toBe(50); // 50 * 1 * 1.0
      expect(result.message).toBe("No discount");
    });
  });

  describe('Test cases tổng hợp - Đảm bảo tất cả các đường đi', () => {
    
    test('Edge case: quantity = 5 (biên giới 10% discount)', () => {
      const result = calculateTotalPrice(200, 5);
      expect(result.totalPrice).toBe(900); // 200 * 5 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('Edge case: quantity = 10 (biên giới 20% discount)', () => {
      const result = calculateTotalPrice(50, 10);
      expect(result.totalPrice).toBe(400); // 50 * 10 * 0.8
      expect(result.message).toBe("20% discount");
    });

    test('Edge case: số thập phân với unitPrice', () => {
      const result = calculateTotalPrice(19.99, 10);
      expect(result.totalPrice).toBeCloseTo(159.92, 2); // 19.99 * 10 * 0.8
      expect(result.message).toBe("20% discount");
    });
  });
});
