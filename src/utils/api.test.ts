import { getRate } from "./api";

jest.mock("./api", () => {
  return {
    getExchangeApiURL: jest.fn(),
    getRate: () => "42",
  };
});
describe("api", () => {
  describe("getRate", () => {
    it("returns rate fetched from api", async () => {
      const result = await getRate("EUR", "USD");
      expect(result).toBe("42");
    });
  });
});
