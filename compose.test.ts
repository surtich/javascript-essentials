import { expect, test } from "vitest";
import { compose, mcompose, mflip, mpipe, pipe, pipe2, pipe3 } from "./compose";
import { mcurry } from "./curry";
import { filter } from "./filter";
import { map } from "./map";
import { reduce } from "./reduce";

test("pasa los valores de izquierda a derecha", function () {
  expect(
    pipe(
      (x: number) => x * 2,
      (x: number) => x + 1,
    )(3),
  ).toBe(7);
});

test("compone funciones de derecha a izquierda", function () {
  expect(
    compose(
      (x: number) => x * 2,
      (x: string) => x.length,
    )("pepe"),
  ).toBe(8);
});

test("las variantes de pipe producen el mismo resultado", function () {
  const length = (value: string) => value.length;
  const double = (value: number) => value * 2;

  expect(pipe(length, double)("pepe")).toBe(8);
  expect(pipe2(length, double)("pepe")).toBe(8);
  expect(pipe3(length, double)("pepe")).toBe(8);
});

test("mpipe compone varias etapas de izquierda a derecha", function () {
  const length = (value: string) => value.length;
  const increment = (value: number) => value + 1;
  const double = (value: number) => value * 2;
  const format = (value: number) => `length=${value}`;
  const result: (value: string) => string = mpipe(
    length,
    increment,
    double,
    format,
  );

  expect(result("pepe")).toBe("length=10");
});

test("mcompose compone varias etapas de derecha a izquierda", function () {
  const length = (value: string) => value.length;
  const increment = (value: number) => value + 1;
  const double = (value: number) => value * 2;
  const format = (value: number) => `length=${value}`;
  const result: (value: string) => string = mcompose(
    format,
    double,
    increment,
    length,
  );

  expect(result("pepe")).toBe("length=10");
});

test("mflip invierte los argumentos pasados a una función", function () {
  const calculate = (a: number, b: number, c: number) => a * b - c;

  expect(calculate(3, 2, 1)).toBe(5);
  expect(mflip(calculate)(1, 2, 3)).toBe(5);
});

test("puedo componer funciones que reciban más de un parámetro", function () {
  const add = mcurry(function (x, y) {
    return x + y;
  });

  const product = mcurry(function (x, y) {
    return x * y;
  });

  expect(mpipe(add(1), product(2), add(3))(4)).toBe(13);
});

test("puedo componer map, filter y reduce", function () {
  expect(
    mpipe(
      // @ts-ignore 
      map((x: number) => x + 1),
      filter((x: number) => x > 2),
      reduce((acc: number, x: number) => acc + x, 0),
      // @ts-ignore
    )([1, 2, 3]),
  ).toBe(7);
});
