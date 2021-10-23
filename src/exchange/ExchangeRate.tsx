import React from "react";
import { ExchangeRateType } from "../types";
import { getCurrencySign } from "../utils/currency";
import { round } from "../utils/number";

export interface UnitExchangeRateProps {
  data: ExchangeRateType;
  rounded?: boolean;
}
export function ExchangeRate({ data, rounded }: UnitExchangeRateProps) {
  const { rate, quote, base } = data;
  let text = "...";
  if (rate !== "Infinity" && rate !== "0") {
    const normalized = rounded ? round(rate) : rate;
    text = `${getCurrencySign(quote)}1 = ${getCurrencySign(base)}${normalized}`;
  }

  return <div>{text}</div>;
}
