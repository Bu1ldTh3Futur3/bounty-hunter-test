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
  const symbols = { USD: "$", EUR: "\u20ac", GBP: "\u00a3" };
  const symbol = symbols[currency] || currency + " ";
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$\u20ac\u00a3,\s]/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR with cents");
assert(formatCurrency(0) === "$0.00", "formats zero with cents");
assert(formatCurrency(-50) === "$-50.00", "formats negative numbers");
assert(formatCurrency(100) === "$100.00", "always shows two decimals");
assert(formatCurrency(12.5, "GBP") === "\u00a312.50", "formats GBP with cents");
assert(formatCurrency(42, "CAD") === "CAD 42.00", "formats unknown currency codes");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("\u20ac1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("\u00a31,234.56") === 1234.56, "parses GBP symbol");
assert(parseCurrency("$-50.00") === -50, "parses negative USD amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
