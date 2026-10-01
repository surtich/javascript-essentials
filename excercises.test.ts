import { expect, test } from "vitest";
import { every, find, some } from "./excercises";

test("some devuelve true cuando un elemento coincide", function () {
  expect(some([1, 2, 3], (value) => value > 2)).toBe(true);
});

test("some devuelve false cuando ningún elemento coincide o el array está vacío", function () {
  expect(some([1, 2, 3], (value) => value > 3)).toBe(false);
  expect(some([], (value: number) => value > 0)).toBe(false);
});

test("every devuelve true cuando todos los elementos coinciden", function () {
  expect(every([1, 2, 3], (value) => value > 0)).toBe(true);
});

test("every devuelve false cuando un elemento no coincide", function () {
  expect(every([1, 2, 3], (value) => value < 3)).toBe(false);
});

test("every devuelve true para un array vacío", function () {
  expect(every([], (value: number) => value > 0)).toBe(true);
});

test("find devuelve el primer elemento coincidente", function () {
  expect(find([1, 2, 3, 4], (value) => value > 2)).toBe(3);
});

test("find devuelve null cuando no hay coincidencias o el array está vacío", function () {
  expect(find([1, 2, 3], (value) => value > 3)).toBeNull();
  expect(find([], (value: number) => value > 0)).toBeNull();
});
