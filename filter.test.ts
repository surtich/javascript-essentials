import { expect, test } from "vitest";
import { filter } from "./filter";
import { isEven, isPalindrome } from "./functions";
import { reduce } from "./reduce";

test("filtra los números pares", function () {
  expect(filter(isEven, [1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
});

test("filtra los palíndromos", function () {
  expect(filter(isPalindrome, ["level", "hello", "abba", "world"])).toEqual([
    "level",
    "abba",
  ]);

  expect(filter(isPalindrome, [])).toEqual([]);
});
