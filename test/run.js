const { formatCurrency, parseCurrency } = require("../dist/format.js");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ok - ${message}`);
  } else {
    failed++;
    console.log(`  fail - ${message}`);
  }
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats a decimal USD amount");
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR with two decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimals");
assert(formatCurrency(100) === "$100.00", "formats whole numbers with two decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative amounts after the symbol");
assert(formatCurrency(1234.5, "GBP") === "\u00a31,234.50", "formats GBP with two decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses USD with thousands separator");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("\u20ac1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("\u00a31,234.56") === 1234.56, "parses GBP symbol");
assert(parseCurrency("$-50.00") === -50, "parses negative USD amounts");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
