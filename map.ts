import { mcurry } from "./curry.ts";

export const map = mcurry(function <X, Y>(f: (x: X) => Y, xs: X[]): Y[] {
  var ys: Y[] = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    ys[i] = f(xs[i]);
  }
  return ys;
});
