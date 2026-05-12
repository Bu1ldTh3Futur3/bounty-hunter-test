// Simple test runner — exercises the compiled output of src/format.ts so the
// tests prove the source actually works (not a copy of the source).
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const distEntry = path.join(__dirname, "..", "dist", "format.js");
if (!fs.existsSync(distEntry)) {
  execSync("npx tsc", { stdio: "inherit", cwd: path.join(__dirname, "..") });
}

const { formatCurrency, parseCurrency } = require(distEntry);

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
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative numbers");
assert(formatCurrency(-1234.56) === "$-1,234.56", "formats negative with commas");
assert(formatCurrency(99.5) === "$99.50", "pads single decimal to two");
assert(formatCurrency(500, "GBP") === "£500.00", "formats GBP with 2 decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£500.00") === 500, "parses GBP symbol");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
