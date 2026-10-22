import { expect, test, vi } from "vitest";

vi.mock("./utils.ts", () => ({
  peticionHttp: vi.fn(
    (
      requestUrl: string,
      callback: (
        error: Error | null,
        result: { result: number } | null,
      ) => void,
    ) => {
      const url = new URL(requestUrl);
      const a = Number(url.searchParams.get("a"));
      const b = Number(url.searchParams.get("b"));
      const result = url.pathname === "/add" ? a + b : a * b;
      callback(null, { result });
    },
  ),
}));

import {
  asyncAdd,
  asyncCompose,
  asyncDouble,
  asyncIdentity,
  asyncInc,
  asyncMap,
  asyncMCompose,
  asyncMPipe,
  asyncMultiply,
  asyncPipe,
} from "./async.ts";

const asyncDoubleThenInc = asyncCompose(asyncInc, asyncDouble);
const asyncIncThenDouble = asyncPipe(asyncInc, asyncDouble);
const asyncCalculation = (continuation: (result: number) => void) => {
  asyncAdd(4, 5, function (result1) {
    asyncMultiply(result1, 2, function (result2: number) {
      asyncInc(result2, function (result3) {
        asyncDouble(result3, continuation);
      });
    });
  });
};
const asyncPipeline = asyncMPipe(
  asyncInc,
  asyncInc,
  asyncInc,
  asyncDouble,
);
const asyncComposition = asyncMCompose(asyncInc, asyncInc, asyncDouble);

function resultOf(
  operation: (value: number, continuation: (result: number) => void) => void,
  value: number,
): Promise<number> {
  return new Promise((resolve) => operation(value, resolve));
}

function calculationResult(
  operation: (continuation: (result: number) => void) => void,
): Promise<number> {
  return new Promise((resolve) => operation(resolve));
}

test("asyncCompose construye el flujo de doble seguido de incremento", async () => {
  await expect(resultOf(asyncDoubleThenInc, 5)).resolves.toBe(11);
});

test("asyncPipe construye el flujo de incremento seguido de doble", async () => {
  //@ts-ignore
  await expect(resultOf(asyncIncThenDouble, 5)).resolves.toBe(12);
});

test("asyncCalculation ejecuta la secuencia original", async () => {
  await expect(calculationResult(asyncCalculation)).resolves.toBe(38);
});

test("asyncMPipe compone el pipeline original de izquierda a derecha", async () => {
  await expect(resultOf(asyncPipeline, 4)).resolves.toBe(14);
});

test("asyncMCompose compone la secuencia original de derecha a izquierda", async () => {
  await expect(resultOf(asyncComposition, 4)).resolves.toBe(10);
});

test("asyncIdentity entrega su entrada a la continuación", async () => {
  await expect(resultOf(asyncIdentity, 7)).resolves.toBe(7);
});

test("asyncMap aplica asyncInc a cada elemento", async () => {
  const results = await new Promise<number[]>((resolve) => {
    asyncMap(asyncInc, [1, 3, 4, 2], function (ys: number[]) {
      resolve(ys);
    });
  });

  expect(results).toEqual([2, 4, 5, 3]);
});
