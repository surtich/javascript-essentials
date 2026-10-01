import { expect, test } from "vitest";
import { curry, mcurry } from "./curry";

test("aplica curry a una función de dos argumentos", function () {
  const product = (x: number, y: number) => x * y;
  const curryProduct = curry(product);

  expect(curryProduct(3)(4)).toBe(12);
});

test("conserva el tipo de resultado de la función original", function () {
  const format = (quantity: number, unit: string) => `${quantity} ${unit}`;
  const curryFormat = curry(format);

  expect(curryFormat(2)("books")).toBe("2 books");
});

test("mcurry acepta todos los argumentos en una llamada", function () {
  const sum = (x: number, y: number, z: number) => x + y + z;

  expect(mcurry(sum)(1, 2, 3)).toBe(6);
});

test("mcurry acepta argumentos en varias llamadas", function () {
  const sum = (x: number, y: number, z: number) => x + y + z;

  expect(mcurry(sum)(1)(2)(3)).toBe(6);
  expect(mcurry(sum)(1, 2)(3)).toBe(6);
});

test("mcurry ignora las llamadas vacías al recopilar argumentos", function () {
  const sum = (x: number, y: number, z: number) => x + y + z;

  expect(mcurry(sum)(1)()()(2)(3)).toBe(6);
});

test("mcurry conserva los tipos de argumentos mixtos", function () {
  const describeBook = (quantity: number, title: string, available: boolean) =>
    `${quantity} ${title}: ${available ? "available" : "unavailable"}`;

  expect(mcurry(describeBook)(3, "Dune")(true)).toBe("3 Dune: available");
  expect(mcurry(describeBook)(3)("Dune", false)).toBe("3 Dune: unavailable");
});

