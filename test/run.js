// Simple test runner
const { formatCurrency, parseCurrency } = require("../dist/format.js");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  OK ${message}`);
  } else {
    failed++;
    console.log(`  FAIL ${message}`);
  }
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR with cents");
assert(formatCurrency(0) === "$0.00", "formats zero with cents");
assert(formatCurrency(100) === "$100.00", "always shows two decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative USD amount");
assert(formatCurrency(-1234.5, "GBP") === "\u00a3-1,234.50", "formats negative GBP with grouping");
assert(formatCurrency(42, "CAD") === "CAD 42.00", "formats unsupported currency code");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic USD amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("\u20ac1,234.56") === 1234.56, "parses EUR symbol and commas");
assert(parseCurrency("\u00a31,234.56") === 1234.56, "parses GBP symbol and commas");
assert(parseCurrency("$-50.00") === -50, "parses negative USD amount");
assert(parseCurrency("($50.00)") === -50, "parses accounting-style negative amount");
assert(parseCurrency("USD 100.00") === 100, "parses currency code prefix");
assert(parseCurrency("100.00 USD") === 100, "parses currency code suffix");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
