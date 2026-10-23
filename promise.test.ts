import { expect, test, vi } from "vitest";

vi.mock("./utils.ts", () => ({
  peticionHttp: vi.fn(
    (
      requestUrl: string,
      callback: (
        error: Error | null,
        result: { result: number | boolean } | null,
      ) => void,
    ) => {
      const url = new URL(requestUrl);
      const a = Number(url.searchParams.get("a"));
      const b = Number(url.searchParams.get("b"));
      const value = Number(url.searchParams.get("value"));

      if (
        (url.pathname === "/add" || url.pathname === "/multiply") &&
        (!Number.isFinite(a) || !Number.isFinite(b))
      ) {
        callback(new Error("Error HTTP: 400 Bad Request"), null);
        return;
      }

      if (
        (url.pathname === "/double" || url.pathname === "/isEven") &&
        !Number.isFinite(value)
      ) {
        callback(new Error("Error HTTP: 400 Bad Request"), null);
        return;
      }

      const result =
        url.pathname === "/multiply"
          ? a * b
          : url.pathname === "/double"
            ? value * 2
            : url.pathname === "/isEven"
              ? value % 2 === 0
              : a + b;
      callback(null, { result });
    },
  ),
}));

import {
  promiseAdd,
  promiseDouble,
  promiseIsEven,
  promiseInc,
  promiseMap,
  promiseMultiply,
} from "./promise.ts";

async function sum(xs: number[]): Promise<number> {
  let result = 0;

  for (const x of xs) {
    result = await promiseAdd(result, x);
  }

  return result;
}

test("encadena sumas asíncronas", async () => {
  vi.useFakeTimers();
  try {
    const result = promiseAdd(4, 5).then(promiseAdd(7)).then(promiseAdd(2));
    const expectation = expect(result).resolves.toBe(18);
    await vi.runAllTimersAsync();
    await expectation;
  } finally {
    vi.useRealTimers();
  }
});

test("multiplica números con promiseMultiply", async () => {
  await expect(promiseMultiply(3, 4)).resolves.toBe(12);
  await expect(promiseMultiply(3)(4)).resolves.toBe(12);
});

test("duplica un número con promiseDouble", async () => {
  await expect(promiseDouble(4)).resolves.toBe(8);
});

test("comprueba si un número es par con promiseIsEven", async () => {
  await expect(promiseIsEven(4)).resolves.toBe(true);
  await expect(promiseIsEven(3)).resolves.toBe(false);
});

test("promiseMap aplica la función asíncrona a todos los elementos", async () => {
  vi.useFakeTimers();
  try {
    const result = promiseMap(promiseInc, [1, 2, 3]);
    await vi.runAllTimersAsync();
    await expect(result).resolves.toEqual([2, 3, 4]);
  } finally {
    vi.useRealTimers();
  }
});

test("propaga el error de la petición como rechazo", async () => {
  // @ts-expect-error Se comprueba el rechazo ante un argumento inválido.
  const result = promiseAdd(4, 5).then(promiseAdd({})).then(promiseAdd(2));

  await expect(result).rejects.toThrow("Error HTTP: 400 Bad Request");
});

test("sum suma los elementos de un array secuencialmente", async () => {
  vi.useFakeTimers();
  try {
    const result = sum([1, 2, 3]);
    await vi.runAllTimersAsync();
    await expect(result).resolves.toBe(6);
  } finally {
    vi.useRealTimers();
  }
});

test("sum rechaza el resultado cuando una suma falla", async () => {
  vi.useFakeTimers();
  try {
    // @ts-expect-error Se comprueba el rechazo ante un elemento inválido.
    const result = sum([1, {}, 3]);
    const rejection = expect(result).rejects.toThrow(
      "Error HTTP: 400 Bad Request",
    );
    await vi.runAllTimersAsync();
    await rejection;
  } finally {
    vi.useRealTimers();
  }
});

test("sum permite gestionar errores con catch", async () => {
  vi.useFakeTimers();
  try {
    // @ts-expect-error Se comprueba el rechazo ante un elemento inválido.
    const result = sum([1, {}, 3]).catch(() => "Capturado error");
    await vi.runAllTimersAsync();
    await expect(result).resolves.toBe("Capturado error");
  } finally {
    vi.useRealTimers();
  }
});
