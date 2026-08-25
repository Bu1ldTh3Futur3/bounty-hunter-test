export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";

  // Fix: handle negative numbers correctly
  const formatted = amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${symbol}${formatted}`;
}

export function parseCurrency(str: string): number {
  // Fix: strip currency symbols properly
  const cleaned = str.replace(/[\$€£]/g, '').replace(/,/g, '');
  return parseFloat(cleaned);
}