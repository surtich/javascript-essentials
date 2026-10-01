
export function product(x: number, y: number) {  
    return x * y;
}

function curry<X, Y, Z>(f: (x: X, y: Y) => Z): (x: X) => (y: Y) => Z {
  return function(x: X) {
    return function(y: Y) {
      return f(x, y);
    }
  }
}

product(3, 4);
curry(product)(3)(4);

const curryProduct = curry(product);

export const double = curryProduct(2);
const triple = curryProduct(3);

double(8);

// ejercicio implementar mcurry
// la función mcurry recibe una función f con un número indeterminado de parámetros y devuelve una función g
// esa función g que devuelve, si recibe los parámetros de f, retorna el resultado de f
// pero si g recibe menos parámetros que los de f, entonces devuelve una función que recibe el resto de parámetros faltantes
// y así hasta recibir todos los parámetros,

// EJEMPLO

/*
function kk(x, y, z, a, b, c) {
  return x + y + z + a + b + c;
}


function mcurry(f) {
  ?????
}

// EJEMPLO DE USO

mcurry(kk)(x)(y)(z)(a)(b)(c)
mcurry(kk)(x,y,z,a,b,c)
mcurry(kk)(x,y)(z,a)(b,c)
mcurry(kk)(x,y)(z)(a)(b,c)
*/



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


export function add(x: number, y: number): number;
export function add(x: string, y: string): string;
export function add(x: any, y: any) {
  return x + y;
}


export function unshift<X>(xs: X[], x: X): X[] {
  return [x, ...xs];
}
