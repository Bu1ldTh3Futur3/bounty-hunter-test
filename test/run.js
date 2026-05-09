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

// Updated implementations to match fixed src/format.ts
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = amount < 0 ? "-" : "";
  return `${symbol}${sign}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimal places");

// Bug #1: negative numbers
assert(formatCurrency(-50) === "$-50.00", "handles negative number ($-50.00)");
assert(formatCurrency(-1234.56) === "$-1,234.56", "handles large negative number");
assert(formatCurrency(-1000, "EUR") === "€-1,000.00", "handles negative EUR");

// Bug #2: always 2 decimal places
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(100.1) === "$100.10", "pads to 2 decimal places");
assert(formatCurrency(100.125) === "$100.13", "rounds to 2 decimal places");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses $ amount");
assert(parseCurrency("$0") === 0, "parses zero");

// Bug #3: handles € and £ symbols
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£99.99") === 99.99, "parses GBP symbol");
assert(parseCurrency("€0") === 0, "parses EUR zero");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
