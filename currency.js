export function formatCurrency(amount) {
  const sign = amount < 0 ? '-' : '';
  const absAmount = Math.abs(amount);
  return sign + '$' + absAmount.toFixed(2);
}

export function parseCurrency(str) {
  return parseFloat(str.replace(/[^0-9.-]/g, ''));
}