import { mcurry } from "./curry.ts";

export const filter = mcurry(function <X>(f: (x: X) => boolean, xs: X[]): X[] {
  const ys = [];
  for (let i = 0; i < xs.length; i++) {
    if (f(xs[i])) {
      ys.push(xs[i]);
    }
  }
  return ys;
});
