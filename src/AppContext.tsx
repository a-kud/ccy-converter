import { createContext, useReducer } from "react";
import { getNextIndex, getPreviousIndex } from "./utils/list";
import {
  addAmount,
  convertAmount,
  invertRate,
  parseAmountInput,
  subtractAmount,
} from "./utils/number";

export interface AppState {
  accounts: AccountData[];
  baseAccountIdx: number;
  quoteAccountIdx: number;
  baseAmount: string;
  quoteAmount: string;
  baseActive: boolean;
  rate: string;
}

export interface AccountData {
  currency: string;
  amount: string;
}

export function initialState(): AppState {
  const accounts = [
    { currency: "EUR", amount: "9999" },
    { currency: "USD", amount: "9000" },
    { currency: "GBP", amount: "42" },
  ];

  return {
    accounts,
    baseAccountIdx: 0,
    quoteAccountIdx: 1,
    baseAmount: "",
    quoteAmount: "",
    baseActive: true,
    rate: "0",
  };
}

interface AppContextValue {
  state: AppState;
  dispatch: (action: Action) => void;
}

interface RateChangedAction {
  type: "RATE_CHANGED";
  payload: {
    rate: string;
  };
}

interface BaseAccountChangedAction {
  type: "BASE_CHANGED";
  payload: {
    next?: boolean;
  };
}

interface QuoteAccountChangedAction {
  type: "QUOTE_CHANGED";
  payload: {
    next?: boolean;
  };
}

interface BaseAmountChangedAction {
  type: "BASE_AMOUNT_CHANGED";
  payload: {
    amount: string;
  };
}

interface QuoteAmountChangedAction {
  type: "QUOTE_AMOUNT_CHANGED";
  payload: {
    amount: string;
  };
}

interface ExchangeAction {
  type: "EXCHANGE_REQUEST";
  payload: {};
}

type Action =
  | RateChangedAction
  | BaseAccountChangedAction
  | QuoteAccountChangedAction
  | BaseAmountChangedAction
  | QuoteAmountChangedAction
  | ExchangeAction;

export const AppContext = createContext<AppContextValue>({
  state: initialState(),
  dispatch: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactChild;
}) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const contextValue: AppContextValue = {
    state,
    dispatch,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "RATE_CHANGED":
      return rateChangeReducer(state, action.payload);
    case "BASE_CHANGED":
      return baseChangeReducer(state, action.payload);
    case "QUOTE_CHANGED":
      return quoteChangeReducer(state, action.payload);
    case "BASE_AMOUNT_CHANGED":
      return baseAmountChangeReducer(state, action.payload);
    case "QUOTE_AMOUNT_CHANGED":
      return quoteAmountChangeReducer(state, action.payload);
    case "EXCHANGE_REQUEST":
      return exchangeReducer(state);
    default:
      return state;
  }
}

function exchangeReducer(state: AppState): AppState {
  const { accounts, baseAccountIdx, quoteAccountIdx, baseAmount, quoteAmount } =
    state;
  const baseAccount = accounts[baseAccountIdx];
  const quoteAccount = accounts[quoteAccountIdx];
  if (!baseAccount || !quoteAccount) {
    return state;
  }

  baseAccount.amount = subtractAmount(baseAccount.amount, baseAmount);
  quoteAccount.amount = addAmount(quoteAccount.amount, quoteAmount);

  const updatedAccounts = accounts.map((acc) => {
    if (acc.currency === baseAccount.currency) {
      return { ...baseAccount };
    }

    if (acc.currency === quoteAccount.currency) {
      return { ...quoteAccount };
    }

    return acc;
  });

  return {
    ...state,
    accounts: updatedAccounts,
    baseAmount: "",
    quoteAmount: "",
  };
}

function baseChangeReducer(
  state: AppState,
  payload: BaseAccountChangedAction["payload"]
): AppState {
  const { next } = payload;
  const { baseAccountIdx, accounts } = state;
  const newIdx = next
    ? getNextIndex(accounts, baseAccountIdx)
    : getPreviousIndex(accounts, baseAccountIdx);

  return { ...state, baseAccountIdx: newIdx, rate: "0" };
}

function quoteChangeReducer(
  state: AppState,
  payload: QuoteAccountChangedAction["payload"]
): AppState {
  const { next } = payload;
  const { quoteAccountIdx, accounts } = state;

  const newIdx = next
    ? getNextIndex(accounts, quoteAccountIdx)
    : getPreviousIndex(accounts, quoteAccountIdx);

  return { ...state, quoteAccountIdx: newIdx, rate: "0" };
}

function baseAmountChangeReducer(
  state: AppState,
  payload: BaseAmountChangedAction["payload"]
): AppState {
  const baseAmount = parseAmountInput(payload.amount);
  return {
    ...state,
    baseAmount: baseAmount,
    quoteAmount: convertAmount(baseAmount, state.rate),
    baseActive: true,
  };
}

function quoteAmountChangeReducer(
  state: AppState,
  payload: QuoteAmountChangedAction["payload"]
): AppState {
  const quoteAmount = parseAmountInput(payload.amount);
  return {
    ...state,
    quoteAmount: quoteAmount,
    baseAmount: convertAmount(quoteAmount, invertRate(state.rate)),
    baseActive: false,
  };
}

function rateChangeReducer(
  state: AppState,
  payload: RateChangedAction["payload"]
): AppState {
  const { rate } = payload;
  if (rate === state.rate) {
    return state;
  }

  let { baseAmount, quoteAmount, baseActive } = state;

  if (baseActive) {
    quoteAmount = convertAmount(baseAmount, rate);
  } else {
    baseAmount = convertAmount(quoteAmount, invertRate(rate));
  }

  return { ...state, rate: rate, baseAmount, quoteAmount };
}
