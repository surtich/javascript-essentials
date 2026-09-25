const inc = (x: number) => x + 1;
const double = (x: number) => x * 2;
const triple = (x: number) => x * 3;
const len = (x: string) => x.length;

function doubleThenInc(x: number) {
  return inc(double(x));
}

function incThenTriple(x: number) {
  return triple(inc(x));
}

function flip() {
 // implementar flip que reciba una función con dos parámetros y devuelva una función con los parámetros en el orden contrario

}

function compose<X, Y, Z>(g: (y: Y) => Z, f: (x: X) => Y): (x: X) => Z {
  return function (x: X) {
    return g(f(x));
  };
}

function pipe<X, Y, Z>(f: (x: X) => Y, g: (y: Y) => Z): (x: X) => Z {
    // implementar pipe con flip
  return function (x: X) {
    return g(f(x));
  };
}

console.log(doubleThenInc(3));
const dTi = pipe(double, inc);
console.log(dTi(3));
console.log(pipe(len, double)("pepe"));
console.log(compose(double, len)("pepe"));
