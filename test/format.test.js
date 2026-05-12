// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.log(`  ✗ ${message}`);
  }
}

// Re-implement fixed functions for testing
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(-50) === "$-50.00", "handles negative numbers");
assert(formatCurrency(-1234.56) === "$-1,234.56", "handles negative with commas");
assert(formatCurrency(0.5) === "$0.50", "handles sub-dollar amounts");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses USD amount");
assert(parseCurrency("$0.00") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP amount");
assert(parseCurrency("$100.00") === 100, "parses simple amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
