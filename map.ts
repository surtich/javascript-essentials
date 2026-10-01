export function map<X, Y>(xs: X[], f: (x: X) => Y): Y[] {
  var ys: Y[] = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    ys[i] = f(xs[i]);
  }
  return ys;
}

// COMPOSICIÓN FUNCIONAL
/*
mpipe(
  map((x) => x * 2),
  filter((x) => x > 2),
  reduce((acc, x) => acc + x, 0),
)([(1, 2, 3)]);
*/
