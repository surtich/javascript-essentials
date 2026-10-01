import { expect, test } from "vitest";
import { isPalindrome } from "./functions";

test("devuelve true para palíndromos", function () {
  expect(isPalindrome("level")).toBe(true);
  expect(isPalindrome("abba")).toBe(true);
  expect(isPalindrome("abbaa   ")).toBe(false);
});

test("devuelve false para palabras que no son palíndromos", function () {
  expect(isPalindrome("hello")).toBe(false);
  expect(isPalindrome("world")).toBe(false);
});

test("devuelve true para una sola letra", function () {
  expect(isPalindrome("a")).toBe(true);
});

test("devuelve true para una cadena vacía", function () {
  expect(isPalindrome("")).toBe(true);
});

test("ignora un número par de espacios", function () {
  expect(isPalindrome("  ")).toBe(true);
});

test("ignora un número impar de espacios", function () {
  expect(isPalindrome("   ")).toBe(true);
  expect(isPalindrome(" ")).toBe(true);
});

test("ignora varios espacios entre palabras", function () {
  expect(isPalindrome("a  b  a")).toBe(true);
});

test("ignora los espacios al principio y al final", function () {
  expect(isPalindrome("  level  ")).toBe(true);
  expect(isPalindrome("   abba")).toBe(true);
  expect(isPalindrome("abba   ")).toBe(true);
  expect(isPalindrome("  level  level ")).toBe(true);
});
