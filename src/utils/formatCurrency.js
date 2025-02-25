const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null) {
    return "";
  }

  const formattedAmount = new Intl.NumberFormat("vi-VN").format(amount);

  return `${formattedAmount} đ`;
};

export default formatCurrency;
