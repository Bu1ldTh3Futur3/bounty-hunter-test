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
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(-50) === "-$50.00", "formats negative amount");
assert(formatCurrency(100) === "$100.00", "always renders two decimal places");
assert(formatCurrency(1234.5, "JPY") === "JPY 1,234.50", "formats unknown currency code");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP symbol");
assert(parseCurrency("-$50.00") === -50, "parses negative currency");
assert(Number.isNaN(parseCurrency("$12-3")), "rejects misplaced minus signs");
assert(Number.isNaN(parseCurrency("$1.2.3")), "rejects multiple decimal points");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
