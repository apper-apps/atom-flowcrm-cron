export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const parseCurrency = (value) => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
};