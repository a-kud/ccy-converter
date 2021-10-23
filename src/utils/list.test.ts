import { getNextIndex, getPreviousIndex } from "./list";

describe("list", () => {
  describe("getNextIndex", () => {
    it("returns next index", () => {
      const result = getNextIndex([1, 2, 3, 4], 1);
      expect(result).toStrictEqual(2);
    });
  });
  describe("getPreviousIndex", () => {
    it("returns previous index", () => {
      const result = getPreviousIndex([1, 2, 3, 4], 1);
      expect(result).toStrictEqual(0);
    });
  });
});
