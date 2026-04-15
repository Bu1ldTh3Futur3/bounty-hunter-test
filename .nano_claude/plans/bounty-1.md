# Plan: Fix bugs in formatCurrency and parseCurrency in src/format.ts. 
1. formatCurrency: handle negative numbers (e.g., -50 -> $-50.00)
2. formatCurrency: always show 2 decimal places (e.g., 100 -> $100.00)
3. parseCurrency: handle multiple currency symbols (e.g., €, £)
4. Add tests for the fixed bugs.

