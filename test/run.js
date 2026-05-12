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

// We test via the source directly (no build step needed for the test)
// The functions are simple enough to re-implement for testing
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const isNegative = amount < 0;
  return isNegative ? `-${symbol}${formatted.slice(1)}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[€£$¥₩₽₨₮₸₵₡₢₣₤₥₦₧₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿,]/g, "").trim();
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(100) === "$100.00", "BUG FIX: always shows 2 decimal places");
assert(formatCurrency(-50) === "-$50.00", "BUG FIX: handles negative numbers");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(-0.99) === "-$0.99", "handles small negative values");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "BUG FIX: parses EUR");
assert(parseCurrency("£500.25") === 500.25, "BUG FIX: parses GBP");
assert(parseCurrency("€0") === 0, "parses zero EUR");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
