/**
 * Format a number as a currency string.
 */
function formatCurrency(amount, currency = "USD") {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";
  
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 */
function parseCurrency(str) {
  if (typeof str !== 'string') return 0;
  const cleaned = str.replace(/[^\d.-]/g, "");
  return parseFloat(cleaned);
}

module.exports = { formatCurrency, parseCurrency };
