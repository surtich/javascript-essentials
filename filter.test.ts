import { expect, test } from "vitest";
import { filter } from "./filter";
import { isEven, isPalindrome } from "./functions";

test("filters even numbers", function () {
  expect(filter([1, 2, 3, 4, 5, 6], isEven)).toEqual([2, 4, 6]);
});

test("filters palindromes", function () {
  expect(filter(["level", "hello", "abba", "world"], isPalindrome)).toEqual([
    "level",
    "abba",
  ]);

  expect(filter([], isPalindrome)).toEqual([]);
});
