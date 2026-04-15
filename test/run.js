import { formatCurrency, parseCurrency } from "../src/format";

function assert(condition, message) {
  if (!condition) {
    throw new Error("FAILED: " + message);
  }
  console.log("✓", message);
}

// $50 bounty test case
assert(
  formatCurrency(1234.56) === "$1,234.56",
  "formatCurrency(1234.56) should equal '$1,234.56'"
);

assert(
  parseCurrency("$1,234.56") === 1234.56,
  "parseCurrency('$1,234.56') should equal 1234.56"
);

console.log("All tests passed!");
