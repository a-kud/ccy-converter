import React from "react";
import styled from "styled-components";
import { color } from "../styles";
import { ExchangeRateType } from "../types";
import { AmountInput } from "./AmountInput";
import { Button } from "./Button";
import { TotalAmount } from "./TotalAmount";
import { ExchangeRate } from "./ExchangeRate";

export const TotalContainer = styled("div")<{ invalid?: boolean }>`
  color: ${(props) => (props.invalid ? color.red : color.whiteTransparent)};
`;

export interface AccountProps {
  currency: string;
  amount: string;
  totalAmount: string;
  base?: boolean;
  exchangeRate?: ExchangeRateType;
  invalid?: boolean;
  onAmountChange: (text: string) => void;
  onAccountChange: (next?: boolean) => void;
  placeholder: string;
}

export const Account = React.memo(
  ({
    base,
    currency,
    amount,
    totalAmount,
    exchangeRate,
    invalid,
    onAmountChange,
    onAccountChange,
    placeholder,
  }: AccountProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleClick = () => {
      const { current } = inputRef;
      if (current) {
        current.focus();
      }
    };

    const handleNext = () => {
      onAccountChange(true);
    };

    const handlePrev = () => {
      onAccountChange();
    };

    return (
      <div className="text-white bg-dark py-3" onClick={handleClick}>
        <div className="d-flex align-items-baseline">
          <Button className="btn btn-dark bg-dark" onClick={handlePrev}>
            〈
          </Button>
          <p>{currency}</p>
          <Button className="btn btn-dark bg-dark" onClick={handleNext}>
            〉
          </Button>
          <div className="d-flex flex-grow-1 justify-content-end w-25">
            {amount.length > 0 && <span>{base ? "-" : "+"}</span>}
            <AmountInput
              className="w-50 border-0 text-light bg-dark"
              placeholder={placeholder}
              value={amount}
              onChange={onAmountChange}
              inputRef={inputRef}
            />
          </div>
        </div>
        <div className="d-flex">
          <TotalContainer invalid={invalid}>
            <TotalAmount currency={currency} amount={totalAmount} />
          </TotalContainer>
          {exchangeRate && (
            <div className="d-flex flex-grow-1 justify-content-end">
              <ExchangeRate data={exchangeRate} rounded />
            </div>
          )}
        </div>
      </div>
    );
  }
);
