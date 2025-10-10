// Constants
const DISCOUNT_LEVELS = {
  NO_DISCOUNT: { rate: 0, message: "No discount" },
  TEN_PERCENT: { rate: 0.1, message: "10% discount" },
  TWENTY_PERCENT: { rate: 0.2, message: "20% discount" }
};

const ERROR_MSG = "Invalid input values";

function calculateTotalPrice(unitPrice, quantity) {
  // Validate input
  if (unitPrice <= 0 || quantity <= 0) {
    return {
      totalPrice: 0,
      message: ERROR_MSG
    };
  }

  // Determine discount level
  let discount = DISCOUNT_LEVELS.NO_DISCOUNT;
  if (quantity >= 10) {
    discount = DISCOUNT_LEVELS.TWENTY_PERCENT;
  } else if (quantity >= 5) {
    discount = DISCOUNT_LEVELS.TEN_PERCENT;
  }

  // Calculate total price
  const totalPrice = unitPrice * quantity * (1 - discount.rate);

  return {
    totalPrice,
    message: discount.message
  };
}

// Export for testing
module.exports = { calculateTotalPrice };
