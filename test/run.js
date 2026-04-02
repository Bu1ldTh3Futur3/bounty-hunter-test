// Simple test runner
const fs = require("fs");
const path = require("path");
const vm = require("vm");

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

function loadFormatModule() {
  const sourcePath = path.join(__dirname, "..", "src", "format.ts");
  const tsSource = fs.readFileSync(sourcePath, "utf8");
  const jsSource = tsSource
    .replace(/export function /g, "function ")
    .replace(/: number/g, "")
    .replace(/: string/g, "")
    .replace(/: Record<string, string>/g, "");

  const script = `
${jsSource}
module.exports = { formatCurrency, parseCurrency };
`;

  const context = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(script, context);
  return context.module.exports;
}

const { formatCurrency, parseCurrency } = loadFormatModule();

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with two decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimals");
assert(formatCurrency(100) === "$100.00", "always shows two decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative numbers");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR values");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP values");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
