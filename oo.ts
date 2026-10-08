function greet(greeting: string) {
  return `${greeting} ${this.name}!`;
}

function createPerson(name: string, age: number) {
  function isAdult() {
    return age >= 18;
  }

  function getAge() {
    return age;
  }

  function setAge(newAge: number) {
    age = newAge;
  }

  return {
    name,
    greet,
    isAdult,
    getAge,
    setAge,
  };
}

function createStudent(name: string, age: number) {
  function addModule(moduleName: string) {
    this.modules.push(moduleName);
  }

  const student = createPerson(name, age);
  student.modules = [];
  student.addModule = addModule;

  return student;
}

const person1 = createPerson("Pepe", 23);
const person2 = createPerson("Luis", 15);

console.log(person1.greet("Hola"));
console.log(person2.greet("Hi"));

const student1 = createStudent("Ana", 23);

student1.addModule("Sistemas");

console.log(student1);

const person3 = {
  name: "Rosa",
  age: 34,
};

person3.greet = greet;
console.log(person3.greet("Hola"));

const person4 = {
  name: "Ramón",
  age: 25,
};

console.log(greet.call(person4, "Hola"));
console.log(greet.apply(person4, ["Hola"]));

const person4Greet = greet.bind(person4, "Hola");

console.log(person4Greet());

const person4Greet2 = greet.bind(person4);

console.log(person4Greet2("Hi"));

console.log(person1.isAdult());
console.log(person2.isAdult());
person2.setAge(99);
console.log(person2.getAge());
