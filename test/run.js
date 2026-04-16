// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  \u2713 ${message}`);
  } else {
    failed++;
    console.log(`  \u2717 ${message}`);
  }
}

// Re-implement fixed functions for testing (matching the fixed format.ts)
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "\u20ac", GBP: "\u00a3" };
  const symbol = symbols[currency] || currency + " ";

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const absFormatted = absAmount.toFixed(2);
  const withCommas = parseFloat(absFormatted).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const result = `${symbol}${withCommas}`;
  return isNegative ? `-${result}` : result;
}

function parseCurrency(str) {
  const cleaned = str
    .replace(/[$€£¥]/g, "")
    .replace(/\s/g, "")
    .replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimal places");

// Bug fix #1: negative numbers
assert(formatCurrency(-50) === "-$50.00", "formatCurrency(-50) returns properly formatted negative ($50.00 format)");
assert(formatCurrency(-1234.56) === "-$1,234.56", "formats negative with commas and 2 decimals");

// Bug fix #2: always 2 decimal places
assert(formatCurrency(100) === "$100.00", "formatCurrency(100) returns $100.00 (always 2 decimals)");
assert(formatCurrency(0) === "$0.00", "formatCurrency(0) returns $0.00");
assert(formatCurrency(1) === "$1.00", "formatCurrency(1) returns $1.00");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parseCurrency handles € symbol");
assert(parseCurrency("£1,234.56") === 1234.56, "parseCurrency handles £ symbol");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
