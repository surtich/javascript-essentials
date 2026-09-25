export function reduce<X, R>(xs: X[], init: R, f: (acc: R, x: X) => R): R {
  let acc = init;
  for (let element of xs) {
    acc = f(acc, element);
  }

  return acc;
}
