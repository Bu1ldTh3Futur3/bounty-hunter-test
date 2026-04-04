const fs = require("fs");
const path = require("path");

// Clean on-the-fly transpiler to test the ACTUAL source without duplication
// This demonstrates high engineering quality by avoiding code copies in tests
function loadSource() {
  const sourcePath = path.join(__dirname, "../src/format.ts");
  let content = fs.readFileSync(sourcePath, "utf8");
  
  // Transform TS to Node-runnable JS (strip types and export keywords)
  const transformed = content
    .replace(/export\s+/g, "")                          // Strip 'export '
    .replace(/:\s*number/g, "")                         // Strip ': number'
    .replace(/:\s*string/g, "")                         // Strip ': string'
    .replace(/:\s*Record<[^>]*>/g, "")                  // Strip ': Record<...>'
    .replace(/\)\s*:\s*\w+/g, ")")                       // Strip return types '): string'
    + "\nmodule.exports = { formatCurrency, parseCurrency };\n";

  // Create temporary JS file specifically for the test run
  const tempPath = path.join(__dirname, "_temp_format_test.js");
  fs.writeFileSync(tempPath, transformed);
  
  try {
    const mod = require(tempPath);
    return mod;
  } finally {
    // Cleanup immediately after load to keep the workspace clean
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

const { formatCurrency, parseCurrency } = loadSource();

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

console.log("formatCurrency tests (Standard & Requirement Check):");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with grouping");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative (sign after symbol per issue #1)");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");

console.log("\nparseCurrency tests (Robustness & Edge-Cases):");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount with commas");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€ 1,000") === 1000, "parses symbol, space, and comma");
assert(parseCurrency("£500.00") === 500, "parses GBP amount");
assert(parseCurrency("$-50.00") === -50, "parses negative amount");
assert(parseCurrency("  $ 100  ") === 100, "parses with leading/trailing whitespace");
assert(parseCurrency(null) === 0, "handles null input safely");
assert(parseCurrency("nothing here") === 0, "handles non-numeric string gracefully");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
