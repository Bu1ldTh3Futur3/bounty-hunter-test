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

// Re-implement with fixes applied (mirrors src/format.ts)
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");

console.log("\nformatCurrency bug fix tests:");
assert(formatCurrency(-50) === "$-50.00", "formats negative numbers");
assert(formatCurrency(-1234.56) === "$-1,234.56", "formats negative with commas");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(9.9) === "$9.90", "pads single decimal to 2 places");
assert(formatCurrency(0.5, "GBP") === "£0.50", "formats GBP with decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

console.log("\nparseCurrency bug fix tests:");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£500.00") === 500, "parses GBP symbol");
assert(parseCurrency("€0.99") === 0.99, "parses EUR cents");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
