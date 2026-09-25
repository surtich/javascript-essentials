import { describe, expect, it } from "vitest";
import { double, unshift } from "./functions.ts";
import { reduce } from "./reduce.ts";

describe("reduce", () => {
  it("suma los elementos del array", () => {
    expect(reduce([3, 4, 1, 2], 0, (acc, x) => acc + x)).toBe(10);
  });

  it("aplica unshift en cada paso para invertir la lista", () => {
    expect(
      reduce([3, 4, 1, 2], [] as number[], (acc, x) => unshift(acc, x)),
    ).toEqual([2, 1, 4, 3]);
  });

  it("map se puede implementar con reduce", () => {
    function map<X, Y>(xs: X[], f: (x: X) => Y): Y[] {
      return reduce<X, Y[]>(xs as X[], [] as Y[], (acc: Y[], x: X) => [...acc, f(x)]);
    }
    expect(map([1, 2, 3], double)).toEqual([2, 4, 6]);
    expect(map([], double)).toEqual([]);
  });

  it("filter se puede implementar con reduce", () => {
    //ejercicio
  });
});