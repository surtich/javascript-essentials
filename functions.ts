export function double(x: number) {
  return x * 2;
}

export function inc(x: number) {
  return x + 1;
}

export function head(xs: string) {
  return xs[0];
}

export function negate(x: boolean) {
  return !x;
}

export function len(xs: string) {
  return xs.length;
}

export function isEven(x: number) {
  return x % 2 === 0;
}

export function isPalindrome(word: string) {
  let i = 0;
  let j = word.length - 1;
  while (i < j) {
    while (i < j && word[i] == " ") {
      i++;
    }
    while (j > i && word[j] == " ") {
      j--;
    }

    if (word[i] != word[j]) {
      return false;
    }

    i++;
    j--;
  }

  return true;
}
