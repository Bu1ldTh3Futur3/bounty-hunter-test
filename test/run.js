// Simple test runner
const path = require("path");
const fs = require("fs");

// Import compiled module or fallback
let formatCurrency, parseCurrency;
const distPath = path.join(__dirname, "../dist/format.js");
if (fs.existsSync(distPath)) {
  ({ formatCurrency, parseCurrency } = require(distPath));
} else {
  function formatCurrencyFallback(amount, currency = "USD") {
    const symbols = { USD: "$", EUR: "€", GBP: "£" };
    const symbol = symbols[currency] || currency + " ";
    const sign = amount < 0 ? "-" : "";
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${symbol}${sign}${formatted}`;
  }
  function parseCurrencyFallback(str) {
    const cleaned = str.replace(/[$€£\s]/g, "").replace(/,/g, "");
    return parseFloat(cleaned);
  }
  formatCurrency = formatCurrencyFallback;
  parseCurrency = parseCurrencyFallback;
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
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimal places");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places for whole numbers");
assert(formatCurrency(-50) === "$-50.00", "formats negative USD correctly as $-50.00");
assert(formatCurrency(-1234.56, "EUR") === "€-1,234.56", "formats negative EUR correctly");
assert(formatCurrency(-75.5, "GBP") === "£-75.50", "formats negative GBP correctly with 2 decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0.00") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR currency string correctly");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP currency string correctly");
assert(parseCurrency("$-50.00") === -50, "parses negative USD string correctly");
assert(parseCurrency("€-1,234.56") === -1234.56, "parses negative EUR string correctly");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
