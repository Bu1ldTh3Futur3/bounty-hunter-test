// Simple test runner — imports compiled JS if present, else loads TS via transpile-free mirror
const fs = require("fs");
const path = require("path");

let formatCurrency, parseCurrency;

// Prefer dist after tsc; fallback to inline require of src via Function for node without ts
const dist = path.join(__dirname, "..", "dist", "format.js");
const src = path.join(__dirname, "..", "src", "format.ts");

if (fs.existsSync(dist)) {
  ({ formatCurrency, parseCurrency } = require(dist));
} else {
  // Load TypeScript source by stripping types with a tiny transform for this file only
  let code = fs.readFileSync(src, "utf8");
  code = code
    .replace(/export function/g, "function")
    .replace(/: string/g, "")
    .replace(/: number/g, "")
    .replace(/: Record<string, string>/g, "")
    .replace(/export \{[^}]+\}/g, "");
  code +=
    "\nmodule.exports = { formatCurrency, parseCurrency };\n";
  const mod = { exports: {} };
  // eslint-disable-next-line no-new-func
  Function("module", "exports", "require", code)(mod, mod.exports, require);
  ({ formatCurrency, parseCurrency } = mod.exports);
}

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
assert(formatCurrency(100) === "$100.00", "always 2 decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative amount");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses euro symbol");
assert(parseCurrency("£99.00") === 99, "parses pound symbol");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
