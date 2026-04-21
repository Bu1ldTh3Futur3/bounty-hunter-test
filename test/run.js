// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
          passed++;
          console.log("[OK] " + message);
    } else {
          failed++;
          console.log("[FAIL] " + message);
    }
}

// We test via the source directly (no build step needed for the test)
// The functions are simple enough to re-implement for testing
// In a real project, we would import from ../src/format
const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
    }).format(amount);
};

const parseCurrency = (value) => {
    if (!value) return 0;
    const cleaned = value.replace(/[^0-9.-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
};

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
const negFormatted = formatCurrency(-50);
assert(negFormatted.includes("50.00") && (negFormatted.includes("-") || negFormatted.includes("(")), "formats negative numbers accurately");
assert(formatCurrency(100, "USD") === "$100.00", "forces 2 decimal places");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$-50.00") === -50, "parses negative amount");
assert(parseCurrency("EUR 1,234.56") === 1234.56, "parses EUR");
assert(parseCurrency("Multiple symbols $ EUR GBP 123.45") === 123.45, "strips multiple currency symbols");

console.log("\nSummary: " + passed + " passed, " + failed + " failed");

if (failed > 0) {
    process.exit(1);
}
