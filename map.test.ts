import { expect, test } from "vitest";
import { double, head, len, negate } from "./functions";
import { map } from "./map";

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
