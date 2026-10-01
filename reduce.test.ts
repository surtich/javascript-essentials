import { describe, expect, it } from "vitest";
import { double, isPalindrome, unshift } from "./functions.ts";
import { reduce } from "./reduce.ts";

describe("reduce", () => {
  it("suma los elementos del array", () => {
    expect(reduce((acc: number, x: number) => acc + x, 0, [3, 4, 1, 2])).toBe(
      10,
    );
  });

  it("aplica unshift en cada paso para invertir la lista", () => {
    expect(
      reduce(
        (acc: number[], x: number) => unshift(acc, x),
        [] as number[],
        [3, 4, 1, 2],
      ),
    ).toEqual([2, 1, 4, 3]);
  });

  it("map se puede implementar con reduce", () => {
    function map<X, Y>(f: (x: X) => Y, xs: X[]): Y[] {
      return reduce((acc: Y[], x: X) => [...acc, f(x)], [] as Y[], xs as X[]);
    }
    expect(map(double, [1, 2, 3])).toEqual([2, 4, 6]);
    expect(map(double, [])).toEqual([]);
  });

  it("filter se puede implementar con reduce", () => {
    function filter<X>(f: (x: X) => boolean, xs: X[]): X[] {
      return reduce((acc: X[], x: X) => (f(x) ? [...acc, x] : acc), [], xs);
    }
    expect(filter(isPalindrome, ["level", "hello", "abba", "world"])).toEqual([
      "level",
      "abba",
    ]);
  });
});
