import { afterEach, beforeEach, expect, test, vi } from "vitest";

vi.mock("./utils.ts", () => ({
  peticionHttp: vi.fn(
    (
      requestUrl: string,
      callback: (
        error: Error | null,
        result: { result: number | string } | null,
      ) => void,
    ) => {
      const url = new URL(requestUrl);
      const a = Number(url.searchParams.get("a"));
      const b = Number(url.searchParams.get("b"));
      const result =
        url.pathname === "/concat"
          ? `${url.searchParams.get("a")}${url.searchParams.get("b")}`
          : url.pathname === "/add"
            ? a + b
            : url.pathname === "/isEven"
              ? Number(url.searchParams.get("value")) % 2 === 0
              : a * b;
      callback(null, { result });
    },
  ),
}));

import {
  asyncAdd,
  asyncConcat,
  asyncCompose,
  asyncDouble,
  asyncFilter,
  asyncIdentity,
  asyncInc,
  asyncIsEven,
  asyncMap,
  asyncMCompose,
  asyncMPipe,
  asyncMultiply,
  asyncPipe,
  asyncReduce,
  asyncReduceRight,
} from "./async.ts";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

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

async function resolveTimers<T>(result: Promise<T>): Promise<T> {
  await vi.runAllTimersAsync();
  return result;
}

test("asyncCompose construye el flujo de doble seguido de incremento", async () => {
  await expect(
    resolveTimers(resultOf(asyncDoubleThenInc, 5)),
  ).resolves.toBe(11);
});

test("asyncPipe construye el flujo de incremento seguido de doble", async () => {
  //@ts-ignore
  await expect(
    resolveTimers(resultOf(asyncIncThenDouble, 5)),
  ).resolves.toBe(12);
});

test("asyncCalculation ejecuta la secuencia original", async () => {
  await expect(
    resolveTimers(calculationResult(asyncCalculation)),
  ).resolves.toBe(38);
});

test("asyncMPipe compone el pipeline original de izquierda a derecha", async () => {
  await expect(resolveTimers(resultOf(asyncPipeline, 4))).resolves.toBe(14);
});

test("asyncMCompose compone la secuencia original de derecha a izquierda", async () => {
  await expect(resolveTimers(resultOf(asyncComposition, 4))).resolves.toBe(10);
});

test("asyncIdentity entrega su entrada a la continuación", async () => {
  await expect(resultOf(asyncIdentity, 7)).resolves.toBe(7);
});

test("asyncMap aplica asyncInc a cada elemento", async () => {
  const results = await resolveTimers(
    new Promise<number[]>((resolve) => {
      asyncMap(asyncInc, [1, 3, 4, 2], function (ys: number[]) {
        resolve(ys);
      });
    }),
  );

  expect(results).toEqual([2, 4, 5, 3]);
});

test("asyncFilter conserva los elementos que cumplen el predicado", async () => {
  const results = await new Promise<number[]>((resolve) => {
    asyncFilter(
      (value: number, continuation: (matches: boolean) => void) => {
        continuation(value % 2 === 0);
      },
      [1, 2, 3, 4],
      resolve,
    );
  });

  expect(results).toEqual([2, 4]);
});

test("asyncReduce concatena las cadenas de izquierda a derecha", async () => {
  const result = await resolveTimers(
    new Promise<string>((resolve) => {
      asyncReduce(asyncConcat, "", ["h", "o", "l", "a"], resolve);
    }),
  );

  expect(result).toBe("hola");
});

test("asyncReduceRight concatena las cadenas de derecha a izquierda", async () => {
  const result = await resolveTimers(
    new Promise<string>((resolve) => {
      asyncReduceRight(asyncConcat, "", ["h", "o", "l", "a"], resolve);
    }),
  );

  expect(result).toBe("aloh");
});

test("asyncMPipe compone asyncMap, asyncFilter y asyncReduce", async () => {
  const pipeline = asyncMPipe(
    asyncMap(asyncInc),
    asyncFilter(asyncIsEven),
    asyncReduce(asyncAdd, 0),
  );
  const result = await resolveTimers(
    new Promise<number>((resolve) => {
      pipeline([1, 2, 3], resolve);
    }),
  );

  expect(result).toBe(6);
});
