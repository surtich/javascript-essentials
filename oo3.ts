class Person1 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(greeting: string) {
    return `${greeting} ${this.name}!`;
  }
}

class Student1 extends Person1 {
  grade: string;
  modules: string[];

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
    this.modules = [];
  }

  addModule = (module: string) => {
    this.modules.push(module);
  };
}

const person7 = new Person1("Pepe", 23);

console.log(person7.greet("Hola"));

const student3 = new Student1("Ana", 23, "B");
console.log(student3.greet("Hola"));
student3.addModule("Sistemas");

console.log(student3);

console.log(student3 instanceof Student1);
console.log(student3 instanceof Person1);

console.log("addModule" in Student1.prototype);
console.log(student3.constructor);
console.log(student3.constructor.prototype);

console.log(typeof Student1);
