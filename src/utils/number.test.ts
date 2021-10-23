import { convertAmount, invertRate, parseAmountInput, round } from "./number";

describe("number", () => {
  describe("round method", () => {
    it("returns rounded number", () => {
      expect(round("42.42424242")).toBe("42.42");
    });
  });

  describe("invertRate method", () => {
    it("returns inverted rate", () => {
      expect(invertRate("5")).toBe("0.2");
      expect(invertRate("0")).toBe("Infinity");
    });
  });

  describe("convertAmount method", () => {
    it("returns amount", () => {
      expect(convertAmount("9000", "42")).toBe("378000");
    });
  });

  describe("parseAmountInput method", () => {
    it("parses input", () => {
      expect(parseAmountInput("42")).toBe("42");
      expect(parseAmountInput("42,424242")).toBe("42.42");
      expect(parseAmountInput("42.4242")).toBe("42.42");
    });
  });
});
