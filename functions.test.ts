import { expect, test } from "vitest";
import { isPalindrome } from "./functions";

test("returns true for palindromes", function() {
	 expect(isPalindrome("level")).toBe(true);
	 expect(isPalindrome("abba")).toBe(true);
     expect(isPalindrome("abbaa   ")).toBe(false);
});

test("returns false for non-palindromes", function() {
	 expect(isPalindrome("hello")).toBe(false);
	 expect(isPalindrome("world")).toBe(false);
});

test("returns true for a single letter", function() {
	 expect(isPalindrome("a")).toBe(true);
});

test("returns true for an empty string", function() {
	 expect(isPalindrome("")).toBe(true);
});

test("ignores an even number of spaces", function() {
	 expect(isPalindrome("  ")).toBe(true);
});

test("ignores an odd number of spaces", function() {
	 expect(isPalindrome("   ")).toBe(true);
     expect(isPalindrome(" ")).toBe(true);
});

test("ignores multiple spaces between words", function() {
	 expect(isPalindrome("a  b  a")).toBe(true);
});

test("ignores spaces at the beginning and end", function() {
	 expect(isPalindrome("  level  ")).toBe(true);
	 expect(isPalindrome("   abba")).toBe(true);
	 expect(isPalindrome("abba   ")).toBe(true);
    expect(isPalindrome("  level  level ")).toBe(true);

});