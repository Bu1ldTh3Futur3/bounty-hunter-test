// Simple test runner
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

// Updated implementations matching the fixed source
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");

// New tests for bug fixes
assert(formatCurrency(-50) === "$-50.00", "formats negative numbers");
assert(formatCurrency(-1234.56) === "$-1,234.56", "formats negative with commas");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(99.9) === "$99.90", "pads single decimal to 2 places");
assert(formatCurrency(0.5, "GBP") === "£0.50", "formats GBP with decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

// New tests for bug fixes
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£999.99") === 999.99, "parses GBP symbol");
assert(parseCurrency("€0.50") === 0.5, "parses EUR small amount");
assert(parseCurrency("$-50.00") === -50, "parses negative amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
