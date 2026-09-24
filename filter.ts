export function filter<X>(xs: X[], f: (x: X) => boolean): X[] {
  const ys = [];
  for (let i = 0; i < xs.length; i++) {
    if (f(xs[i])) {
      ys.push(xs[i]);
    }
  }
  return ys;
}
