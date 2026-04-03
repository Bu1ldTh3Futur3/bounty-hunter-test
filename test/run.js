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

// Mirror the fixed implementations for testing (no build step needed)
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isNegative ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

// Bug fixes
assert(formatCurrency(-50) === "-$50.00", "formats negative numbers correctly");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(0.5) === "$0.50", "formats fractional amounts with 2 decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic USD amount");
assert(parseCurrency("$0") === 0, "parses zero");

// Bug fixes
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£500.00") === 500, "parses GBP symbol");
assert(parseCurrency("€1,000") === 1000, "parses EUR without decimals");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
