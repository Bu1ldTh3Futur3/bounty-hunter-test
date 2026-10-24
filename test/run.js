// Simple test runner
const { formatCurrency, parseCurrency } = require("../dist/format.js");

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
// Issue #1 requires two decimals, including these existing whole-number cases.
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");
assert(formatCurrency(-50) === "$-50.00", "formats negative whole amounts");
assert(formatCurrency(100) === "$100.00", "always shows two decimals for whole amounts");
assert(formatCurrency(50.5) === "$50.50", "pads a single decimal place");
assert(formatCurrency(1234.5678) === "$1,234.57", "rounds to two decimal places");
assert(formatCurrency(-1234567.89) === "$-1,234,567.89", "preserves negative sign and thousands separators");
assert(formatCurrency(-50.25) === "$-50.25", "preserves negative fractional amounts");
assert(formatCurrency(1234.5, "GBP") === "£1,234.50", "formats GBP with two decimals");
assert(formatCurrency(1000, "JPY") === "JPY 1,000.00", "preserves unknown-code fallback with two decimals");
assert(formatCurrency(NaN) === "$NaN", "preserves NaN formatting");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR with thousands separators");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP with thousands separators");
assert(parseCurrency("€0") === 0, "parses EUR zero");
assert(parseCurrency("£0") === 0, "parses GBP zero");
assert(parseCurrency("$-50.00") === -50, "parses negative USD");
assert(parseCurrency("€-1,234.56") === -1234.56, "parses negative EUR");
assert(parseCurrency("£-1,234.56") === -1234.56, "parses negative GBP");
assert(parseCurrency("-1,234.56") === -1234.56, "preserves parsing without a currency symbol");
assert(Number.isNaN(parseCurrency("not a number")), "preserves NaN for invalid text");
assert(Number.isNaN(parseCurrency("")), "preserves NaN for empty input");
assert(Number.isNaN(parseCurrency("$$1")), "preserves NaN for repeated currency symbols");
assert(parseCurrency("$12.5tail") === 12.5, "preserves existing numeric-prefix parsing");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
