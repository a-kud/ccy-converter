const currencySign: { [key in string]: string } = {
  EUR: "€",
  GBP: "£",
  USD: "$",
};

export function getCurrencySign(currency: string): string {
  const result = currencySign[currency];
  if (result) {
    return result;
  }

  return "";
}
