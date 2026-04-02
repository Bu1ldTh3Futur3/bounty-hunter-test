// Simple test runner
const { execFileSync } = require("node:child_process");
const path = require("node:path");

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

execFileSync("npx", ["tsc"], {
  cwd: path.resolve(__dirname, ".."),
  stdio: "inherit",
});

const { formatCurrency, parseCurrency } = require("../dist/format.js");

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");
assert(formatCurrency(-50) === "$-50.00", "formats negative amounts");
assert(formatCurrency(100) === "$100.00", "always shows two decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses euro amounts");
assert(parseCurrency("£1,234.56") === 1234.56, "parses pound amounts");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
