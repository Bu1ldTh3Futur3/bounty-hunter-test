export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";
  const prefix = amount < 0 ? "-" : "";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${prefix}${symbol}${formatted}`;
}

export function parseCurrency(str: string): number {
  const cleaned = str.replace(/[^0-9.\-]/g, "");
  return parseFloat(cleaned);
}
