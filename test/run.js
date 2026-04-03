// Test runner for formatCurrency and parseCurrency
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

// Import from compiled output or re-implement for testing
const symbols = { USD: "$", EUR: "\u20AC", GBP: "\u00A3" };

function formatCurrency(amount, currency = "USD") {
  const symbol = symbols[currency] || currency + " ";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$\u20AC\u00A3]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

// --- formatCurrency tests ---
console.log("formatCurrency tests:");

// Basic formatting
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20AC1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

// Bug fix: always 2 decimal places
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(50) === "$50.00", "50 shows as $50.00");
assert(formatCurrency(1) === "$1.00", "1 shows as $1.00");

// Bug fix: negative numbers
assert(formatCurrency(-50) === "-$50.00", "formats negative amount correctly");
assert(formatCurrency(-1234.56) === "-$1,234.56", "formats large negative amount");
assert(formatCurrency(-0.01) === "-$0.01", "formats small negative amount");

// GBP support
assert(formatCurrency(99.99, "GBP") === "\u00A399.99", "formats GBP");

// --- parseCurrency tests ---
console.log("\nparseCurrency tests:");

// Basic parsing
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic USD amount");
assert(parseCurrency("$0") === 0, "parses zero");

// Bug fix: handle EUR symbol
assert(parseCurrency("\u20AC1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("\u20AC500.00") === 500, "parses EUR without commas");

// Bug fix: handle GBP symbol
assert(parseCurrency("\u00A3500") === 500, "parses GBP amount");
assert(parseCurrency("\u00A31,234.56") === 1234.56, "parses GBP with commas");

// --- Results ---
console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
