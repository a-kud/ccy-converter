import { Account } from "./Account";
import { AppContext } from "../AppContext";
import { Button } from "./Button";
import { ExchangeRate } from "./ExchangeRate";
import { getRate } from "../utils/api";
import { invertRate, round } from "../utils/number";
import React, { useMemo } from "react";

const REFRESH_INTERVAL = 1000000000;

export function Exchanger() {
  const { state, dispatch } = React.useContext(AppContext);
  const {
    accounts,
    baseAmount,
    quoteAmount,
    baseAccountIdx,
    quoteAccountIdx,
    rate,
  } = state;
  const baseAccount = accounts[baseAccountIdx];
  const quoteAccount = accounts[quoteAccountIdx];

  React.useEffect(() => {
    if (baseAccount.currency === quoteAccount.currency) {
      dispatch({ type: "RATE_CHANGED", payload: { rate: "1" } });
      return;
    }

    let timeout: number;
    const fetch = async () => {
      const newRate = await getRate(
        baseAccount.currency,
        quoteAccount.currency
      );
      dispatch({ type: "RATE_CHANGED", payload: { rate: newRate } });
      timeout = setTimeout(fetch, REFRESH_INTERVAL);
    };

    fetch();

    return () => clearTimeout(timeout);
  }, [baseAccount.currency, quoteAccount.currency, dispatch]);

  const handleBaseAmountChange = (text) => {
    dispatch({ type: "BASE_AMOUNT_CHANGED", payload: { amount: text } });
  };

  const handleQuoteAmountChange = (text) => {
    dispatch({ type: "QUOTE_AMOUNT_CHANGED", payload: { amount: text } });
  };

  const handleExchange = () => {
    dispatch({ type: "EXCHANGE_REQUEST", payload: {} });
  };

  const handleBaseAccountChange = (next?: boolean) => {
    dispatch({ type: "BASE_CHANGED", payload: { next } });
  };

  const handleQuoteAccountChange = (next?: boolean) => {
    dispatch({ type: "QUOTE_CHANGED", payload: { next } });
  };

  const exchangeRate = useMemo(
    () => ({
      base: quoteAccount.currency,
      quote: baseAccount.currency,
      rate: round(rate, 4),
    }),
    [quoteAccount, baseAccount, rate]
  );

  const exchangeRateInverted = useMemo(
    () => ({
      base: baseAccount.currency,
      quote: quoteAccount.currency,
      rate: invertRate(rate),
    }),
    [quoteAccount, baseAccount, rate]
  );

  const amountValid =
    parseFloat(baseAccount.amount) >= parseFloat(baseAmount ? baseAmount : "0");

  return (
    <div className="border border-3 border-dark">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <ExchangeRate data={exchangeRate} />
        </div>
        <Button
          onClick={
            baseAmount.length > 0 && amountValid ? handleExchange : undefined
          }
          className="btn btn-dark rounded-0"
        >
          Exchange
        </Button>
      </div>
      <Account
        base
        placeholder={"Amount to sell"}
        currency={baseAccount.currency}
        amount={baseAmount}
        totalAmount={baseAccount.amount}
        onAmountChange={handleBaseAmountChange}
        onAccountChange={handleBaseAccountChange}
        invalid={!amountValid}
      />
      <Account
        placeholder={"Amount to get"}
        currency={quoteAccount.currency}
        amount={quoteAmount}
        totalAmount={quoteAccount.amount}
        exchangeRate={exchangeRateInverted}
        onAmountChange={handleQuoteAmountChange}
        onAccountChange={handleQuoteAccountChange}
      />
    </div>
  );
}
