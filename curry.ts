export function curry<X, Y, Z>(f: (x: X, y: Y) => Z): (x: X) => (y: Y) => Z {
  return function (x: X) {
    return function (y: Y) {
      return f(x, y);
    };
  };
}

type AnyFunction = (...args: any[]) => any;

type Curried<FunctionType extends AnyFunction, Arguments extends unknown[]> = <
  NextArguments extends unknown[],
>(
  ...args: NextArguments
) => NextArguments extends []
  ? Curried<FunctionType, Arguments>
  : Parameters<FunctionType> extends [
        ...Arguments,
        ...NextArguments,
        ...infer Remaining,
      ]
    ? Remaining extends []
      ? ReturnType<FunctionType>
      : Curried<FunctionType, [...Arguments, ...NextArguments]>
    : never;

type Mcurry = <FunctionType extends AnyFunction>(
  f: FunctionType,
) => Curried<FunctionType, []>;

export const mcurry: Mcurry = function (f) {
  return function _mcurry(...args: any[]) {
    if (args.length >= f.length) {
      return f(...args);
    }
    return function (...nextArgs: any[]) {
      return _mcurry(...args, ...nextArgs);
    };
  };
};
