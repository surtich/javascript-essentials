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

test("encadena sumas asíncronas", async () => {
  await expect(
    promiseAdd(4, 5).then(promiseAdd(7)).then(promiseAdd(2)),
  ).resolves.toBe(18);
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
