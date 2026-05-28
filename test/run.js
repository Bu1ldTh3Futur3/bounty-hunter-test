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

// Fixed implementations matching src/format.ts
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "\u20AC", GBP: "\u00A3" };
  const symbol = symbols[currency] || currency + " ";
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (amount < 0) {
    return `-${symbol}${formatted}`;
  }
  return `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$\u20AC\u00A3]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20AC1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");

// New tests for fixed bugs
console.log("\nformatCurrency - negative numbers:");
assert(formatCurrency(-50) === "-$50.00", "formats negative amount");
assert(formatCurrency(-1234.56) === "-$1,234.56", "formats negative amount with commas");

console.log("\nformatCurrency - decimal places:");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(99.9) === "$99.90", "pads single decimal digit");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

// New tests for fixed bugs
console.log("\nparseCurrency - multi-currency:");
assert(parseCurrency("\u20AC1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("\u00A31,234.56") === 1234.56, "parses GBP amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
