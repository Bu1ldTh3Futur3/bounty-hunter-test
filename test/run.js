// Simple test runner
const { formatCurrency, parseCurrency } = require("../dist/format.js");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  PASS ${message}`);
  } else {
    failed++;
    console.log(`  FAIL ${message}`);
  }
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(100) === "$100.00", "always shows two decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative amount");
assert(formatCurrency(-1234.5, "GBP") === "£-1,234.50", "formats negative GBP amount");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP amount");
assert(parseCurrency("$-50.00") === -50, "parses negative USD amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
