import { getCurrencySign } from "./currency";

describe("getCurrencySign", () => {
  it("returns corresponding symbol", () => {
    expect(getCurrencySign("USD")).toBe("$");
    expect(getCurrencySign("foo")).toBe("");
  });
});
