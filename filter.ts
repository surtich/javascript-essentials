import { isEven, isPalindrome } from "./functions.ts";

function evens(numbers: number[]) {
  const ys = [];
  for (let i = 0; i < numbers.length; i++) {
    if (isEven(numbers[i])) {
      ys.push(numbers[i]);
    }
  }
  return ys;
}

function palindromes(words: string[]) {
  const ys = [];
  for (let i = 0; i < words.length; i++) {
    if (isPalindrome(words[i])) {
      ys.push(words[i]);
    }
  }
  return ys;
}

console.log(evens([1, 4, 2, 7, 6]));
console.log(palindromes(["level", "hello", "world", "abba", "abbaa   "]));


// crear la function filter