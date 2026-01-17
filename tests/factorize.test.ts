import { describe, it, expect } from "vitest";
import { factorize } from "../src/index.js";

describe("factorize", () => {
  describe("正常系", () => {
    it("12を素因数分解すると[2, 2, 3]", () => {
      expect(factorize(12).factors).toEqual([2, 2, 3]);
    });

    it("素数は自身のみ", () => {
      expect(factorize(7).factors).toEqual([7]);
      expect(factorize(13).factors).toEqual([13]);
      expect(factorize(97).factors).toEqual([97]);
    });

    it("1は[1]を返す", () => {
      expect(factorize(1).factors).toEqual([1]);
    });

    it("2は[2]を返す", () => {
      expect(factorize(2).factors).toEqual([2]);
    });

    it("大きな合成数を正しく分解する", () => {
      expect(factorize(100).factors).toEqual([2, 2, 5, 5]);
      expect(factorize(360).factors).toEqual([2, 2, 2, 3, 3, 5]);
      expect(factorize(1000).factors).toEqual([2, 2, 2, 5, 5, 5]);
    });

    it("2の累乗を正しく分解する", () => {
      expect(factorize(8).factors).toEqual([2, 2, 2]);
      expect(factorize(64).factors).toEqual([2, 2, 2, 2, 2, 2]);
      expect(factorize(1024).factors).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
    });

    it("大きな素数を処理できる", () => {
      expect(factorize(104729).factors).toEqual([104729]);
    });

    it("15桁の数値を処理できる", () => {
      const result = factorize(999999999999999);
      const product = result.factors.reduce((a, b) => a * b, 1);
      expect(product).toBe(999999999999999);
    });
  });

  describe("境界値", () => {
    it("最小値1を処理できる", () => {
      expect(factorize(1).factors).toEqual([1]);
    });

    it("最小の素数2を処理できる", () => {
      expect(factorize(2).factors).toEqual([2]);
    });

    it("最小の合成数4を処理できる", () => {
      expect(factorize(4).factors).toEqual([2, 2]);
    });
  });

  describe("結果の検証", () => {
    it("素因数の積が元の数と等しい", () => {
      const testCases = [12, 100, 360, 1000, 12345, 99999];
      for (const n of testCases) {
        const { factors } = factorize(n);
        const product = factors.reduce((a, b) => a * b, 1);
        expect(product).toBe(n);
      }
    });

    it("結果は昇順にソートされている", () => {
      const testCases = [12, 100, 360, 1000, 12345, 99999];
      for (const n of testCases) {
        const { factors } = factorize(n);
        const sorted = [...factors].sort((a, b) => a - b);
        expect(factors).toEqual(sorted);
      }
    });
  });

  describe("割り算回数", () => {
    it("1の場合は割り算回数0", () => {
      expect(factorize(1).divisionCount).toBe(0);
    });

    it("割り算回数が返される", () => {
      const result = factorize(12);
      expect(result.divisionCount).toBeGreaterThan(0);
    });
  });
});
