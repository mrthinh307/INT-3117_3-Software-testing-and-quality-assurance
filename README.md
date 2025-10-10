# Báo cáo Kiểm thử C2 (Branch Coverage) - calculateTotalPrice

## 📊 Kết quả Coverage

| Metric | Coverage | Chi tiết |
|--------|----------|----------|
| **Statements** | ✅ 100% | 12/12 |
| **Branches** | ✅ 100% | 8/8 |
| **Functions** | ✅ 100% | 1/1 |
| **Lines** | ✅ 100% | 12/12 |

## 🎯 Mục tiêu đạt được

- ✅ **100% Branch Coverage (C2)** - Tất cả các nhánh rẽ đều được test
- ✅ **14 test cases** - Bao phủ đầy đủ 3 điểm quyết định
- ✅ **Edge cases** - Kiểm tra các giá trị biên

## 📁 Cấu trúc Project

```
github/
├── index.js              # Mã nguồn chương trình
├── index.test.js         # File test với 14 test cases
├── package.json          # Cấu hình Jest & dependencies
├── coverage-report.txt   # Báo cáo Text chi tiết
├── README.md            # File này
└── coverage/            # Thư mục báo cáo coverage
    ├── index.html       # ⭐ Báo cáo HTML - Mở trong browser
    ├── lcov-report/     # Báo cáo LCOV format
    └── coverage-final.json
```

## 🚀 Hướng dẫn sử dụng

### 1. Cài đặt dependencies (đã hoàn thành)
```bash
npm install
```

### 2. Chạy test
```bash
# Chạy test thông thường
npm test

# Chạy test với coverage report
npm run test:coverage

# Chạy test trong watch mode (tự động chạy lại khi có thay đổi)
npm run test:watch
```

### 3. Xem báo cáo

#### Báo cáo Text
Mở file: `coverage-report.txt`

## 📝 Chi tiết 3 Điểm Quyết Định

### Điểm 1: Kiểm tra Input hợp lệ
**Điều kiện:** `unitPrice <= 0 || quantity <= 0`

| Nhánh | Điều kiện | Test Cases |
|-------|-----------|------------|
| TRUE | Input không hợp lệ | 3 test cases |
| FALSE | Input hợp lệ | 1 test case |

### Điểm 2: Kiểm tra giảm giá 20%
**Điều kiện:** `quantity >= 10`

| Nhánh | Điều kiện | Test Cases |
|-------|-----------|------------|
| TRUE | quantity ≥ 10 | 2 test cases |
| FALSE | quantity < 10 | 1 test case |

### Điểm 3: Kiểm tra giảm giá 10%
**Điều kiện:** `quantity >= 5`

| Nhánh | Điều kiện | Test Cases |
|-------|-----------|------------|
| TRUE | 5 ≤ quantity < 10 | 2 test cases |
| FALSE | quantity < 5 | 2 test cases |

## 🧪 Danh sách Test Cases

1. ✅ unitPrice ≤ 0 (invalid)
2. ✅ quantity ≤ 0 (invalid)
3. ✅ Cả hai ≤ 0 (invalid)
4. ✅ Input hợp lệ
5. ✅ quantity = 10 (20% discount)
6. ✅ quantity > 10 (20% discount)
7. ✅ quantity < 10 (không 20%)
8. ✅ quantity = 5 (10% discount)
9. ✅ quantity = 7 (10% discount)
10. ✅ quantity < 5 (no discount)
11. ✅ quantity = 1 (no discount)
12. ✅ Edge case: biên 10%
13. ✅ Edge case: biên 20%
14. ✅ Edge case: số thập phân

## 🛠️ Công nghệ sử dụng

- **Jest 29.7.0** - Testing framework
- **Istanbul** - Code coverage (built-in trong Jest)
- **Node.js** - Runtime environment

## 📈 Cấu hình Jest

```json
{
  "testEnvironment": "node",
  "coverageDirectory": "coverage",
  "collectCoverageFrom": ["index.js"],
  "coverageReporters": ["html", "text", "text-summary", "lcov"],
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  }
}
```

**Ngày tạo:** October 10, 2025  
**Framework:** Jest + Istanbul Coverage
