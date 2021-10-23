import { getCurrencySign } from "../utils/currency";
import { CurrencyAmountType } from "../types";

export function TotalAmount({ currency, amount }: CurrencyAmountType) {
  return (
    <div>
      You have {getCurrencySign(currency)}
      {amount}
    </div>
  );
}
