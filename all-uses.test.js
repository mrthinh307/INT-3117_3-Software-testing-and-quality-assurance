const { calculateTotalPrice } = require('./index');

/**
 * ALL-USES COVERAGE TESTING
 * 
 * All-uses coverage đảm bảo rằng mọi cặp def-use (định nghĩa-sử dụng) của biến
 * đều được kiểm tra ít nhất một lần.
 * 
 * Phân tích def-use pairs trong calculateTotalPrice:
 * 
 * 1. unitPrice (parameter):
 *    - def: line parameter
 *    - use: line validation (unitPrice <= 0)
 *    - use: line calculation (unitPrice * quantity * (1 - discount.rate))
 * 
 * 2. quantity (parameter):
 *    - def: line parameter  
 *    - use: line validation (quantity <= 0)
 *    - use: line discount check (quantity >= 10)
 *    - use: line discount check (quantity >= 5)
 *    - use: line calculation (unitPrice * quantity * (1 - discount.rate))
 * 
 * 3. discount:
 *    - def: line NO_DISCOUNT assignment
 *    - def: line TWENTY_PERCENT assignment
 *    - def: line TEN_PERCENT assignment
 *    - use: line calculation (1 - discount.rate)
 *    - use: line return (discount.message)
 * 
 * 4. totalPrice:
 *    - def: line calculation
 *    - use: line return
 */

describe('calculateTotalPrice - All-Uses Coverage Testing', () => {

  describe('Def-Use Pairs cho biến unitPrice', () => {
    
    test('DU1: unitPrice def (parameter) -> use (validation check, invalid)', () => {
      // unitPrice = -50 được định nghĩa tại parameter
      // và được sử dụng trong điều kiện unitPrice <= 0
      const result = calculateTotalPrice(-50, 5);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('DU2: unitPrice def (parameter) -> use (validation check, valid) -> use (calculation)', () => {
      // unitPrice = 100 được định nghĩa tại parameter
      // được sử dụng trong điều kiện unitPrice <= 0 (false)
      // sau đó được sử dụng trong phép tính totalPrice
      const result = calculateTotalPrice(100, 3);
      expect(result.totalPrice).toBe(300); // 100 * 3 * 1.0
      expect(result.message).toBe("No discount");
    });

    test('DU3: unitPrice def (parameter) -> use (calculation with 10% discount)', () => {
      // unitPrice = 200 được định nghĩa và sử dụng trong tính toán với discount 10%
      const result = calculateTotalPrice(200, 7);
      expect(result.totalPrice).toBe(1260); // 200 * 7 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('DU4: unitPrice def (parameter) -> use (calculation with 20% discount)', () => {
      // unitPrice = 150 được định nghĩa và sử dụng trong tính toán với discount 20%
      const result = calculateTotalPrice(150, 12);
      expect(result.totalPrice).toBe(1440); // 150 * 12 * 0.8
      expect(result.message).toBe("20% discount");
    });
  });

  describe('Def-Use Pairs cho biến quantity', () => {
    
    test('DU5: quantity def (parameter) -> use (validation check, invalid)', () => {
      // quantity = 0 được định nghĩa tại parameter
      // và được sử dụng trong điều kiện quantity <= 0
      const result = calculateTotalPrice(100, 0);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('DU6: quantity def (parameter) -> use (validation) -> use (no discount check) -> use (calculation)', () => {
      // quantity = 3 được định nghĩa tại parameter
      // sử dụng trong validation (pass), quantity >= 10 (false), quantity >= 5 (false)
      // cuối cùng sử dụng trong calculation
      const result = calculateTotalPrice(100, 3);
      expect(result.totalPrice).toBe(300); // 100 * 3 * 1.0
      expect(result.message).toBe("No discount");
    });

    test('DU7: quantity def (parameter) -> use (validation) -> use (10% discount check) -> use (calculation)', () => {
      // quantity = 5 được định nghĩa tại parameter
      // sử dụng trong validation (pass), quantity >= 10 (false), quantity >= 5 (true)
      // cuối cùng sử dụng trong calculation với 10% discount
      const result = calculateTotalPrice(100, 5);
      expect(result.totalPrice).toBe(450); // 100 * 5 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('DU8: quantity def (parameter) -> use (validation) -> use (20% discount check) -> use (calculation)', () => {
      // quantity = 10 được định nghĩa tại parameter
      // sử dụng trong validation (pass), quantity >= 10 (true)
      // cuối cùng sử dụng trong calculation với 20% discount
      const result = calculateTotalPrice(100, 10);
      expect(result.totalPrice).toBe(800); // 100 * 10 * 0.8
      expect(result.message).toBe("20% discount");
    });

    test('DU9: quantity def (parameter) -> use (edge case quantity = 9)', () => {
      // quantity = 9: test biên giới giữa no discount và 10% discount
      const result = calculateTotalPrice(100, 9);
      expect(result.totalPrice).toBe(810); // 100 * 9 * 0.9
      expect(result.message).toBe("10% discount");
    });
  });

  describe('Def-Use Pairs cho biến discount', () => {
    
    test('DU10: discount def (NO_DISCOUNT) -> use (calculation) -> use (message return)', () => {
      // discount được gán = NO_DISCOUNT
      // sau đó sử dụng discount.rate trong tính toán
      // và discount.message trong return
      const result = calculateTotalPrice(50, 2);
      expect(result.totalPrice).toBe(100); // 50 * 2 * 1.0
      expect(result.message).toBe("No discount");
    });

    test('DU11: discount def (TEN_PERCENT) -> use (calculation) -> use (message return)', () => {
      // discount được gán = TEN_PERCENT
      // sau đó sử dụng discount.rate trong tính toán
      // và discount.message trong return
      const result = calculateTotalPrice(80, 6);
      expect(result.totalPrice).toBe(432); // 80 * 6 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('DU12: discount def (TWENTY_PERCENT) -> use (calculation) -> use (message return)', () => {
      // discount được gán = TWENTY_PERCENT
      // sau đó sử dụng discount.rate trong tính toán
      // và discount.message trong return
      const result = calculateTotalPrice(90, 15);
      expect(result.totalPrice).toBe(1080); // 90 * 15 * 0.8
      expect(result.message).toBe("20% discount");
    });
  });

  describe('Def-Use Pairs cho biến totalPrice', () => {
    
    test('DU13: totalPrice def (calculation) -> use (return object)', () => {
      // totalPrice được tính toán và gán giá trị
      // sau đó được sử dụng trong object return
      const result = calculateTotalPrice(100, 4);
      expect(result).toHaveProperty('totalPrice');
      expect(result.totalPrice).toBe(400);
      expect(result).toHaveProperty('message');
    });

    test('DU14: totalPrice def (calculation with decimal) -> use (return)', () => {
      // test với số thập phân để đảm bảo tính toán chính xác
      const result = calculateTotalPrice(19.99, 8);
      expect(result.totalPrice).toBeCloseTo(143.928, 2); // 19.99 * 8 * 0.9
      expect(result.message).toBe("10% discount");
    });
  });

  describe('Test cases kết hợp - Đảm bảo tất cả def-use paths', () => {
    
    test('DU15: Path coverage - Invalid unitPrice với quantity hợp lệ', () => {
      const result = calculateTotalPrice(0, 15);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('DU16: Path coverage - unitPrice hợp lệ với invalid quantity', () => {
      const result = calculateTotalPrice(100, -5);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('DU17: Path coverage - Cả hai invalid', () => {
      const result = calculateTotalPrice(-10, -5);
      expect(result.totalPrice).toBe(0);
      expect(result.message).toBe("Invalid input values");
    });

    test('DU18: Path coverage - Boundary value quantity = 4 (max no discount)', () => {
      const result = calculateTotalPrice(125, 4);
      expect(result.totalPrice).toBe(500); // 125 * 4 * 1.0
      expect(result.message).toBe("No discount");
    });

    test('DU19: Path coverage - Boundary value quantity = 5 (min 10% discount)', () => {
      const result = calculateTotalPrice(120, 5);
      expect(result.totalPrice).toBe(540); // 120 * 5 * 0.9
      expect(result.message).toBe("10% discount");
    });

    test('DU20: Path coverage - Boundary value quantity = 10 (min 20% discount)', () => {
      const result = calculateTotalPrice(75, 10);
      expect(result.totalPrice).toBe(600); // 75 * 10 * 0.8
      expect(result.message).toBe("20% discount");
    });

    test('DU21: Path coverage - Large values', () => {
      const result = calculateTotalPrice(999.99, 100);
      expect(result.totalPrice).toBeCloseTo(79999.2, 1); // 999.99 * 100 * 0.8
      expect(result.message).toBe("20% discount");
    });

    test('DU22: Path coverage - Small decimal values', () => {
      const result = calculateTotalPrice(0.01, 5);
      expect(result.totalPrice).toBeCloseTo(0.045, 3); // 0.01 * 5 * 0.9
      expect(result.message).toBe("10% discount");
    });
  });

  describe('Kiểm tra tính toàn vẹn của return object', () => {
    
    test('DU23: Return object structure - all properties present', () => {
      const result = calculateTotalPrice(100, 7);
      expect(result).toEqual({
        totalPrice: expect.any(Number),
        message: expect.any(String)
      });
      expect(Object.keys(result)).toHaveLength(2);
    });

    test('DU24: Return object structure - error case', () => {
      const result = calculateTotalPrice(-1, 5);
      expect(result).toEqual({
        totalPrice: 0,
        message: "Invalid input values"
      });
    });
  });
});
