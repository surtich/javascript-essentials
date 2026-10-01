export function flip<X, Y, Z>(f: (x: X, y: Y) => Z): (y: Y, x: X) => Z {
  return function (y: Y, x: X) {
    return f(x, y);
  };
}

export function compose<X, Y, Z>(g: (y: Y) => Z, f: (x: X) => Y): (x: X) => Z {
  return function (x: X) {
    return g(f(x));
  };
}

export function pipe<X, Y, Z>(f: (x: X) => Y, g: (y: Y) => Z): (x: X) => Z {
  return function (x: X) {
    return g(f(x));
  };
}

export function pipe2<X, Y, Z>(f: (x: X) => Y, g: (y: Y) => Z): (x: X) => Z {
  return compose(g, f);
}

export const pipe3 = flip(compose);

type UnaryFunction = (value: any) => any;

type ValidPipeline<Functions extends readonly UnaryFunction[]> =
  Functions extends readonly [
    infer First extends UnaryFunction,
    infer Second extends UnaryFunction,
    ...infer Rest extends UnaryFunction[],
  ]
    ? ReturnType<First> extends Parameters<Second>[0]
      ? ValidPipeline<readonly [Second, ...Rest]>
      : never
    : unknown;

type ValidComposition<Functions extends readonly UnaryFunction[]> =
  Functions extends readonly [
    infer First extends UnaryFunction,
    infer Second extends UnaryFunction,
    ...infer Rest extends UnaryFunction[],
  ]
    ? ReturnType<Second> extends Parameters<First>[0]
      ? ValidComposition<readonly [Second, ...Rest]>
      : never
    : unknown;

type LastFunction<Functions extends readonly UnaryFunction[]> =
  Functions extends readonly [
    ...UnaryFunction[],
    infer Last extends UnaryFunction,
  ]
    ? Last
    : never;

type MPipe = <Functions extends readonly [UnaryFunction, ...UnaryFunction[]]>(
  ...fs: Functions & ValidPipeline<Functions>
) => (
  value: Parameters<Functions[0]>[0],
) => ReturnType<LastFunction<Functions>>;

export const mpipe: MPipe = function (...fs) {
  return function (x) {
    let result = x;
    for (const f of fs) {
      result = f(result);
    }
    return result;
  };
};

type Reverse<Arguments extends readonly unknown[]> =
  Arguments extends readonly [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];

type MFlip = <FunctionType extends (...args: any[]) => any>(
  f: FunctionType,
) => (...args: Reverse<Parameters<FunctionType>>) => ReturnType<FunctionType>;

export const mflip: MFlip = function (f) {
  return function (...args) {
    return f(...args.reverse());
  };
};

type MCompose = <
  Functions extends readonly [UnaryFunction, ...UnaryFunction[]],
>(
  ...fs: Functions & ValidComposition<Functions>
) => (
  value: Parameters<LastFunction<Functions>>[0],
) => ReturnType<Functions[0]>;

export const mcompose: MCompose = mflip(mpipe) as MCompose;
