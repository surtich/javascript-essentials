import { mcurry } from "./curry.ts";

export const reduce = mcurry(function <X, R>(
  f: (acc: R, x: X) => R,
  init: R,
  xs: X[],
): R {
  let acc = init;
  for (let element of xs) {
    acc = f(acc, element);
  }

  return acc;
});
