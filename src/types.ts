export interface CurrencyAmountType {
  currency: string;
  amount: string;
}

export interface ExchangeRateType {
  base: string;
  quote: string;
  rate: string;
}

export interface RateResponseType {
  success: boolean;
  error: {
    info: string;
    type: string;
  };
}
