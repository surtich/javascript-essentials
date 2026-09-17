function double(x: number) {
  return x * 2;
}

function inc(x: number) {
  return x + 1;
}


function head(xs: string) {
  return xs[0];
}

function doubleArray(xs: number[]) {
  var ys: number[] = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    ys[i] = double(xs[i]);
  }
  return ys;
}

function incArray(xs: number[]) {
  var ys: number[] = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    ys[i] = inc(xs[i]);
  }
  return ys;
}

function heads(xs: string[]) {
  var ys: string[] = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    ys[i] = head(xs[i]);
  }
  return ys;
}

// evitar la repetición de código

var numbers = [2, 5, 8];
var strings = ["foo", "bar", "baz"];
console.log(doubleArray(numbers));
console.log(incArray(numbers)); 
console.log(heads(strings));