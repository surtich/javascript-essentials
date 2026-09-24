import { add, unshift } from "./functions.ts";

function sum(numbers: number[]) {
  let result = 0;
  for (let number of numbers) {
    result = add(result, number);
  }
  return result;
}

function reverse<X>(xs: X[]) {
  let result: X[] = [];
  for (let x of xs) {
    result = unshift(result, x);
  }
  return result;
}

console.log(sum([]));
console.log(sum([3, 4, 1, 2]));
console.log(reverse([1, 2, 3]));


// implementar reduce para evitar la repetición de código
