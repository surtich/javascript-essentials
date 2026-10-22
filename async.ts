import { flip, mflip } from "./compose.ts";
import { mcurry } from "./curry.ts";
import { peticionHttp } from "./utils.ts";

export function asyncAdd(
  x: number,
  y: number,
  continuation: (resultado: number) => void,
) {
  peticionHttp(
    `http://localhost:3000/add?a=${x}&b=${y}`,
    function (err, result) {
      setTimeout(
        function () {
          continuation(result.result);
        },
        100 + 300 * Math.random(),
      );
    },
  );
}

export function asyncInc(x: number, continuation: (result: number) => void) {
  asyncAdd(1, x, continuation);
}

export const asyncMultiply = mcurry(function (
  x: number,
  y: number,
  continuation: (resultado: number) => void,
) {
  peticionHttp(
    `http://localhost:3000/multiply?a=${x}&b=${y}`,
    function (err, result) {
      continuation(result.result);
    },
  );
});

export const asyncDouble = asyncMultiply(2);

export function asyncCompose<X, Y, Z>(
  g: (y: Y, continuation: (z: Z) => void) => void,
  f: (x: X, continuation: (y: Y) => void) => void,
): (x: X, continuation: (z: Z) => void) => void {
  return function (x: X, continuation: (z: Z) => void) {
    f(x, function (y: Y) {
      g(y, continuation);
    });
  };
}

export const asyncPipe = flip(asyncCompose);

export function asyncIdentity<X>(x: X, continuation: (x: X) => void) {
  continuation(x);
}

type AsyncFunction = (value: any, continuation: (result: any) => void) => void;

type AsyncInput<FunctionType extends AsyncFunction> =
  Parameters<FunctionType>[0];

type AsyncOutput<FunctionType extends AsyncFunction> = Parameters<
  Parameters<FunctionType>[1]
>[0];

type ValidAsyncPipeline<Functions extends readonly AsyncFunction[]> =
  Functions extends readonly [
    infer First extends AsyncFunction,
    infer Second extends AsyncFunction,
    ...infer Rest extends AsyncFunction[],
  ]
    ? AsyncOutput<First> extends AsyncInput<Second>
      ? ValidAsyncPipeline<readonly [Second, ...Rest]>
      : never
    : unknown;

type ValidAsyncComposition<Functions extends readonly AsyncFunction[]> =
  Functions extends readonly [
    infer First extends AsyncFunction,
    infer Second extends AsyncFunction,
    ...infer Rest extends AsyncFunction[],
  ]
    ? AsyncOutput<Second> extends AsyncInput<First>
      ? ValidAsyncComposition<readonly [Second, ...Rest]>
      : never
    : unknown;

type LastAsyncFunction<Functions extends readonly AsyncFunction[]> =
  Functions extends readonly [
    ...AsyncFunction[],
    infer Last extends AsyncFunction,
  ]
    ? Last
    : never;

type AsyncMPipe = <
  Functions extends readonly [AsyncFunction, ...AsyncFunction[]],
>(
  ...fs: Functions & ValidAsyncPipeline<Functions>
) => (
  value: AsyncInput<Functions[0]>,
  continuation: (result: AsyncOutput<LastAsyncFunction<Functions>>) => void,
) => void;

type AsyncMCompose = <
  Functions extends readonly [AsyncFunction, ...AsyncFunction[]],
>(
  ...fs: Functions & ValidAsyncComposition<Functions>
) => (
  value: AsyncInput<LastAsyncFunction<Functions>>,
  continuation: (result: AsyncOutput<Functions[0]>) => void,
) => void;

function asyncMPipeImpl(fs: readonly AsyncFunction[]): AsyncFunction {
  if (fs.length === 0) {
    return asyncIdentity;
  } else {
    const [head, ...tail] = fs;
    return asyncPipe(head, asyncMPipeImpl(tail));
  }
}

export const asyncMPipe: AsyncMPipe = function (...fs) {
  return asyncMPipeImpl(fs);
};

export const asyncMCompose: AsyncMCompose = mflip(asyncMPipe) as AsyncMCompose;

export const asyncMap = mcurry(function <X, Y>(
  f: (x: X, fcont: (y: Y) => void) => void,
  xs: X[],
  continuation: (ys: Y[]) => void,
): void {
  const ys: Y[] = [];
  let times = 0;
  for (let i in xs) {
    f(xs[i], function (result) {
      ys[i] = result;
      times++;
      if (times == xs.length) {
        continuation(ys);
      }
    });
  }
});

// implementar asyncFilter y asyncReduce
// Probar la composición con asyncMap, asyncFilter y asyncReduce
