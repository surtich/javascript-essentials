import { expect, test } from "vitest";
import { double, head, len, negate } from "./functions";
import { flatMap, map, repeat, secuence } from "./map";

test("aplica double a todos los números", function () {
  expect(map(double, [1, 2, 3])).toEqual([2, 4, 6]);
});

test("aplica inc a todos los números", function () {
  expect(map((x: number) => x + 1, [1, 2, 3])).toEqual([2, 3, 4]);
});

test("aplica head a todas las cadenas", function () {
  expect(map(head, ["cat", "dog", "bird"])).toEqual(["c", "d", "b"]);
});

test("aplica negate a todos los booleanos", function () {
  expect(map(negate, [true, false, true])).toEqual([false, true, false]);
});

test("aplica len a todas las cadenas", function () {
  expect(map(len, ["a", "hello", "typescript"])).toEqual([1, 5, 10]);
});

test("devuelve un array vacío para una entrada vacía", function () {
  expect(map(double, [])).toEqual([]);
});

test("genera una secuencia desde un número inicial hasta uno final", function () {
  expect(secuence(3, 6)).toEqual([3, 4, 5, 6]);
  expect(secuence(3)(6)).toEqual([3, 4, 5, 6]);
});

test("repite un número la cantidad de veces indicada", function () {
  expect(repeat(3, 6)).toEqual([6, 6, 6]);
});

test("aplica ejemplos de secuence y repeat con map", function () {
  expect(
    secuence(3, 6)
      .map(repeat(2))
      .map((xs: number[]) => xs.map(secuence(1))),
  ).toEqual([
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ],
  ]);

  expect(map(map(secuence(1)), map(repeat(2), secuence(3, 6)))).toEqual([
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ],
  ]);
});

test("aplica flatMap a una colección anidada", function () {
  expect(flatMap(secuence(1), flatMap(repeat(2), secuence(3, 6)))).toEqual([
    1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1,
    2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
  ]);

  // @ts-ignore
  expect(flatMap(secuence(1))(flatMap(repeat(2))(secuence(3, 6)))).toEqual([
    1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1,
    2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
  ]);

  expect(secuence(3, 6).flatMap(repeat(2)).flatMap(secuence(1))).toEqual([
    1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1,
    2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
  ]);
});

test("map se puede implmentar con flatMap", function () {
  function map<X, Y>(f: (x: X) => Y, xs: X[]): Y[] {
    // @ts-ignore
    return flatMap((x: X) => [f(x)], xs);
  }

  expect(map(len, ["a", "hello", "typescript"])).toEqual([1, 5, 10]);
});
