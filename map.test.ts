import { expect, test } from "vitest";
import { double, head, len, negate } from "./functions";
import { map } from "./map";

test("aplica double a todos los números", function () {
  expect(map([1, 2, 3], double)).toEqual([2, 4, 6]);
});

test("aplica inc a todos los números", function () {
  expect(map([1, 2, 3], (x) => x + 1)).toEqual([2, 3, 4]);
});

test("aplica head a todas las cadenas", function () {
  expect(map(["cat", "dog", "bird"], head)).toEqual(["c", "d", "b"]);
});

test("aplica negate a todos los booleanos", function () {
  expect(map([true, false, true], negate)).toEqual([false, true, false]);
});

test("aplica len a todas las cadenas", function () {
  expect(map(["a", "hello", "typescript"], len)).toEqual([1, 5, 10]);
});

test("devuelve un array vacío para una entrada vacía", function () {
  expect(map([], double)).toEqual([]);
});
