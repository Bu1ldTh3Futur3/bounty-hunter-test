// Fix: Fix formatCurrency and parseCurrency bugs
// File: src/format.ts

// 1. `formatCurrency(-50)` returns a properly formatted negative currency string
// 2. `formatCurrency(100)` returns "$100.00" (always 2 decimal places)
// 3. `parseCurrency("€1,234.56")` returns `1234.56`
// 4. All existing tests still pass
// 5. Add new tests covering the fixed bugs

// Implementation
export function solution() {
  // TODO: Implement based on requirements
}

export default solution;
