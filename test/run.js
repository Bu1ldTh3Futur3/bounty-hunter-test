// Simple test runner that exercises the compiled TypeScript output.
const { execFileSync } = require("node:child_process");
const path = require("node:path");

execFileSync("npm", ["run", "build"], { stdio: "inherit" });

const { formatCurrency, parseCurrency } = require(path.join("..", "dist", "format.js"));

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
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with two decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimals");
assert(formatCurrency(100) === "$100.00", "always shows two decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative USD with sign after symbol");
assert(formatCurrency(-1234.5, "GBP") === "£-1,234.50", "formats negative GBP with grouping and two decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic USD amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol and commas");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP symbol and commas");
assert(parseCurrency("$-50.00") === -50, "parses negative USD amount");
assert(parseCurrency("($50.00)") === -50, "parses accounting-style negative amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
