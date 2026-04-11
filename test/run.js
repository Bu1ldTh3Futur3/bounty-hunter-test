// Simple test runner
const { formatCurrency, parseCurrency } = require("../dist/format");

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

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative number");
assert(formatCurrency(100) === "$100.00", "formats integer with 2 decimal places");
assert(formatCurrency(9.9) === "$9.90", "pads single decimal place");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic USD amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("£99.99") === 99.99, "parses GBP amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
