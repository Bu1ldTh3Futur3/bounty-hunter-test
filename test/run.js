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

const { formatCurrency, parseCurrency } = require("../dist/format.js");

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");
assert(formatCurrency(-50) === "$-50.00", "formats negative amounts");
assert(formatCurrency(100) === "$100.00", "always shows two decimal places");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("\u20ac1,234.56") === 1234.56, "parses EUR");
assert(parseCurrency("\u00a31,234.56") === 1234.56, "parses GBP");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
