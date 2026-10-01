import { expect, test } from "vitest";
import { filter } from "./filter";
import { isEven, isPalindrome } from "./functions";
import { reduce } from "./reduce";

test("filtra los números pares", function () {
  expect(filter([1, 2, 3, 4, 5, 6], isEven)).toEqual([2, 4, 6]);
});

test("filtra los palíndromos", function () {
  expect(filter(["level", "hello", "abba", "world"], isPalindrome)).toEqual([
    "level",
    "abba",
  ]);

  expect(filter([], isPalindrome)).toEqual([]);
});
