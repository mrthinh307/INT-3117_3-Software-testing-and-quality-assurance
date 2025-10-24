# Software Testing & Quality Assurance - Project Testing

## 📁 Cấu trúc Project

```
github/
├── index.js                      # ⭐ Mã nguồn chương trình (calculateTotalPrice)
├── index.test.js                 # Test cases - C2 Branch Coverage
├── index.all-uses.test.js        # Test cases - All-Uses Coverage
├── package.json                  # Cấu hình Jest & dependencies
├── README.md                     # File này - Tổng quan project
├── C2-COVERAGE-README.md        # Hướng dẫn chi tiết về C2 Coverage
├── ALL-USES-README.md           # Hướng dẫn chi tiết về All-Uses Coverage
├── coverage-report.txt           # Báo cáo C2 coverage (text format)
├── all-uses-coverage-report.txt  # Báo cáo All-Uses coverage (text format)
└── coverage/                     # Thư mục báo cáo coverage
    ├── index.html                # Báo cáo HTML - Mở trong browser
    └── lcov-report/              # Báo cáo LCOV format
```

## 🎯 Các loại kiểm thử trong project

### 1. C2 Branch Coverage (Độ phủ nhánh)
- **File test**: `index.test.js`
- **Hướng dẫn**: `C2-COVERAGE-README.md`
- **Số test cases**: 14
- **Mục tiêu**: Đảm bảo mọi nhánh TRUE/FALSE đều được test
- **Báo cáo**: `coverage-report.txt`

### 2. All-Uses Coverage (Độ phủ def-use)
- **File test**: `index.all-uses.test.js`
- **Hướng dẫn**: `ALL-USES-README.md`
- **Số test cases**: 24
- **Mục tiêu**: Đảm bảo mọi cặp định nghĩa-sử dụng biến đều được test
- **Báo cáo**: `all-uses-coverage-report.txt`

## 🧪 Chương trình được kiểm thử

**Function**: `calculateTotalPrice(unitPrice, quantity)`

**Mô tả**: Tính tổng giá với các mức giảm giá dựa trên số lượng

**Logic**:
- Input không hợp lệ (≤ 0) → return error
- quantity ≥ 10 → giảm giá 20%
- quantity ≥ 5 → giảm giá 10%
- quantity < 5 → không giảm giá

**Return**: `{ totalPrice: number, message: string }`

## 🚀 Hướng dẫn sử dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy tests

#### Chạy tất cả tests:
```bash
npm test
```

#### Chạy riêng C2 Branch Coverage:
```bash
npm test -- index.test.js
```

#### Chạy riêng All-Uses Coverage:
```bash
npm test -- index.all-uses.test.js
```

#### Chạy với coverage report:
```bash
npm run test:coverage
```

#### Chạy trong watch mode:
```bash
npm run test:watch
```

### 3. Sinh báo cáo text

#### Báo cáo C2 Coverage:
```bash
npm test -- index.test.js > C2/coverage-report.txt
```

#### Báo cáo All-Uses Coverage:
```bash
npm test -- index.all-uses.test.js > All-uses coverage/all-uses-coverage-report.txt
```

### 4. Xem báo cáo HTML
```bash
# Sau khi chạy test với coverage
# Mở file: coverage/index.html trong browser
```

## 🛠️ Công nghệ sử dụng

- **Jest 29.7.0** - Testing framework
- **Istanbul** - Code coverage tool (built-in trong Jest)
- **Node.js** - Runtime environment

## � Tài liệu chi tiết

- **[C2-COVERAGE-README.md](C2-COVERAGE-README.md)** - Hướng dẫn chi tiết về Branch Coverage
- **[ALL-USES-README.md](ALL-USES-README.md)** - Hướng dẫn chi tiết về All-Uses Coverage

## 📈 Kết quả Coverage mong đợi

### C2 Branch Coverage:
```
PASS  ./c2.test.js
  calculateTotalPrice - C2 Branch Coverage Testing
    ✓ 14 test cases passed

Test Suites: 1 passed
Tests:       14 passed
Coverage:    100% branches
```

### All-Uses Coverage:
```
PASS  ./all-uses.test.js
  calculateTotalPrice - All-Uses Coverage Testing
    ✓ 24 test cases passed

Test Suites: 1 passed
Tests:       24 passed
All def-use pairs: 100% covered
```

---

**Happy Testing! 🚀**
