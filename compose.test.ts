import { expect, test } from "vitest";
import { compose, mcompose, mflip, mpipe, pipe, pipe2, pipe3 } from "./compose";

test("pipes values from left to right", function () {
  expect(
    pipe(
      (x: number) => x * 2,
      (x: number) => x + 1,
    )(3),
  ).toBe(7);
});

test("composes functions from right to left", function () {
  expect(
    compose(
      (x: number) => x * 2,
      (x: string) => x.length,
    )("pepe"),
  ).toBe(8);
});

test("pipe variants produce the same result", function () {
  const length = (value: string) => value.length;
  const double = (value: number) => value * 2;

  expect(pipe(length, double)("pepe")).toBe(8);
  expect(pipe2(length, double)("pepe")).toBe(8);
  expect(pipe3(length, double)("pepe")).toBe(8);
});

test("mpipe composes multiple stages from left to right", function () {
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

test("mcompose composes multiple stages from right to left", function () {
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

test("mflip reverses the arguments passed to a function", function () {
  const calculate = (a: number, b: number, c: number) => a * b - c;

  expect(calculate(3, 2, 1)).toBe(5);
  expect(mflip(calculate)(1, 2, 3)).toBe(5);
});
