// @ts-nocheck

function Person(name: string, age: number) {
  if (this === undefined) {
    return new Person(name, age);
  }
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function (greeting: string) {
  return `${greeting} ${this.name}!`;
  (name, age);
};

const person1 = new Person("Pepe", 23);

console.log(person1);

const person2 = Person("Luis", 12);

console.log(person2 instanceof Person);
console.log(person2 instanceof Object);

console.log(person1.greet == person2.greet);

console.log(person1.greet("Adios"));
console.log(person2.greet("Hola"));

function Student(name: string, age: number, grade: string) {
  if (this === undefined) {
    return new Student(grade);
  }
  this.grade = grade;
  this.modules = [];
  Person.call(this, name, age);
}

function F() {}

F.prototype = Person.prototype;

Student.prototype = new F();

Student.prototype.addModule = function (moduleName: string) {
  this.modules.push(moduleName);
};

const student1 = new Student("Ana", 23, "F");

student1.addModule("Sistemas");

console.log(student1);

console.log(student1.greet("Hola"));

console.log("addModule" in Person.prototype);
console.log("name" in Student.prototype);

console.log(student1 instanceof Student);
console.log(student1 instanceof Person);

console.log(student1.constructor);
console.log(student1.constructor.prototype);
