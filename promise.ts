import { mcurry } from "./curry.ts";
import { peticionHttp } from "./utils.ts";

export const promiseAdd = mcurry(function (
  x: number,
  y: number,
): Promise<number> {
  return new Promise(function (resolve, reject) {
    peticionHttp(
      `http://localhost:3000/add?a=${x}&b=${y}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else if (!result) {
          reject(new Error("La respuesta de suma está vacía"));
        } else {
          setTimeout(
            function () {
              resolve(result.result);
            },
            100 + Math.random() * 200,
          );
        }
      },
    );
  });
});

export const promiseMultiply = mcurry(function (
  x: number,
  y: number,
): Promise<number> {
  return new Promise(function (resolve, reject) {
    peticionHttp<{ result: number }>(
      `http://localhost:3000/multiply?a=${x}&b=${y}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else if (!result) {
          reject(new Error("La respuesta de multiplicación está vacía"));
        } else {
          resolve(result.result);
        }
      },
    );
  });
});

export function promiseIsEven(x: number): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    peticionHttp<{ result: boolean }>(
      `http://localhost:3000/isEven?value=${x}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else if (!result) {
          reject(new Error("La respuesta de paridad está vacía"));
        } else {
          resolve(result.result);
        }
      },
    );
  });
}

export const promiseInc = promiseAdd(1);
export const promiseDouble = promiseMultiply(2);

export const promiseMap = mcurry(function <X, Y>(
  f: (x: X) => Promise<Y>,
  xs: X[],
): Promise<Y[]> {
  return Promise.all(xs.map((x) => f(x)));
});

