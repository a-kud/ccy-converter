import { AppState, reducer } from "./AppContext";

describe("AppContext", () => {
  describe("reducer", () => {
    function createState(partial: Partial<AppState> = {}): AppState {
      return {
        accounts: [
          { currency: "EUR", amount: "42" },
          { currency: "GBP", amount: "42" },
          { currency: "USD", amount: "42" },
        ],
        baseAccountIdx: 0,
        baseActive: true,
        baseAmount: "",
        quoteAccountIdx: 1,
        quoteAmount: "",
        rate: "2",
        ...partial,
      };
    }

    it("handles RATE_CHANGED action correctly when base account is active", () => {
      const state = createState({
        rate: "1.1",
        baseActive: true,
        baseAmount: "10",
        quoteAmount: "13",
      });

      const result = reducer(state, {
        type: "RATE_CHANGED",
        payload: { rate: "2" },
      });

      expect(result).toStrictEqual({
        ...state,
        rate: "2",
        quoteAmount: "20",
      });
    });

    it("handles RATE_CHANGED action correctly when quote account is active", () => {
      const state = createState({
        rate: "1.1",
        baseActive: false,
        baseAmount: "10",
        quoteAmount: "13",
      });

      const result = reducer(state, {
        type: "RATE_CHANGED",
        payload: { rate: "2" },
      });

      expect(result).toStrictEqual({
        ...state,
        rate: "2",
        baseAmount: "6.5",
      });
    });

    it("handles BASE_CHANGED action correctly when next is true", () => {
      const state = createState({
        baseAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "BASE_CHANGED",
        payload: { next: true },
      });

      expect(result).toStrictEqual({
        ...state,
        baseAccountIdx: 2,
        rate: "0",
      });
    });

    it("handles BASE_CHANGED action correctly when next is undefined (means previous)", () => {
      const state = createState({
        baseAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "BASE_CHANGED",
        payload: {},
      });

      expect(result).toStrictEqual({
        ...state,
        baseAccountIdx: 0,
        rate: "0",
      });
    });

    it("handles QUOTE_CHANGED action correctly when next is true", () => {
      const state = createState({
        quoteAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "QUOTE_CHANGED",
        payload: { next: true },
      });

      expect(result).toStrictEqual({
        ...state,
        quoteAccountIdx: 2,
        rate: "0",
      });
    });

    it("handles QUOTE_CHANGED action correctly when next is undefined (means previous)", () => {
      const state = createState({
        quoteAccountIdx: 1,
        rate: "1.2",
      });

      const result = reducer(state, {
        type: "QUOTE_CHANGED",
        payload: {},
      });

      expect(result).toStrictEqual({
        ...state,
        quoteAccountIdx: 0,
        rate: "0",
      });
    });

    it("handles BASE_AMOUNT_CHANGED action correctly", () => {
      const state = createState({
        baseAmount: "7",
        quoteAmount: "13",
        rate: "2",
        baseActive: false,
      });

      const result = reducer(state, {
        type: "BASE_AMOUNT_CHANGED",
        payload: { amount: "10" },
      });

      expect(result).toStrictEqual({
        ...state,
        baseAmount: "10",
        quoteAmount: "20",
        baseActive: true,
      });
    });

    it("handles QUOTE_AMOUNT_CHANGED action correctly", () => {
      const state = createState({
        baseAmount: "7",
        quoteAmount: "13",
        rate: "2",
      });

      const result = reducer(state, {
        type: "QUOTE_AMOUNT_CHANGED",
        payload: { amount: "10" },
      });

      expect(result).toStrictEqual({
        ...state,
        baseAmount: "5",
        quoteAmount: "10",
        baseActive: false,
      });
    });
  });
});
