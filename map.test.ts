import { expect, test } from "vitest";
import { double, head, inc, len, negate } from "./functions";
import { map } from "./map";

test("applies double to every number", function() {
	expect(map([1, 2, 3], double)).toEqual([2, 4, 6]);
});

test("applies inc to every number", function() {
	expect(map([1, 2, 3], inc)).toEqual([2, 3, 4]);
});

test("applies head to every string", function() {
	expect(map(["cat", "dog", "bird"], head)).toEqual(["c", "d", "b"]);
});

test("applies negate to every boolean", function() {
	expect(map([true, false, true], negate)).toEqual([false, true, false]);
});

test("applies len to every string", function() {
	expect(map(["a", "hello", "typescript"], len)).toEqual([1, 5, 10]);
});

test("returns an empty array for empty input", function() {
	expect(map([], double)).toEqual([]);
});
