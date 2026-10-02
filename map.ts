import { mcurry } from "./curry.ts";

export const map = mcurry(function <X, Y>(f: (x: X) => Y, xs: X[]): Y[] {
  var ys: Y[] = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    ys[i] = f(xs[i]);
  }
  return ys;
});

export const secuence = mcurry(function (from: number, to: number): number[] {
  // implementación alternativa
  // new Array(to - from + 1).fill(from).map((x,i) => x + i )

  let result = [];
  for (let n = from; n <= to; n++) {
    result.push(n);
  }
  return result;
});

export const repeat = mcurry(function (times: number, number: number): number[] {
  // implementación alternativa
  // new Array(times).fill(number)

  let result = [];
  for (let n = 1; n <= times; n++) {
    result.push(number);
  }
  return result;
});

export const flatMap = mcurry(function <X, Y>(f: (x: X) => Y[], xs: X[]): Y[] {
  var ys: Y[] = [];
  for (var i = 0; i < xs.length; i++) {
    ys.push(...f(xs[i]));
  }
  return ys;
});
