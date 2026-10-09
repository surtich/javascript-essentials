const ys = [1, 2, 3];
console.log(ys.map((x) => x + 1));

const xs = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  "no es un nombre de variable válido": "patata"
};

console.log(Array.prototype.map.call(xs, (x) => x + 1));

function kk(...args) {
  console.log(args.map((x) => x + 1));
  console.log(Array.prototype.map.call(arguments, (x) => x + 1));
}

kk(1, 2, 3);

console.log(xs[0]);
console.log(xs["0"]);

console.log(ys[0]);
console.log(ys["0"]);

console.log(xs.length);
console.log(xs["no es un nombre de variable válido"]);
