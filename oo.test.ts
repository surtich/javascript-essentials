import { describe, expect, expectTypeOf, test } from "vitest";

describe("Creación de objetos y acceso a sus propiedades", function () {
  test("crea un objeto literal con propiedades simples y un objeto anidado que contiene arrays", function () {
    const person = {
      name: "John",
      address: "123 Main St",
      age: 30,
      modules: {
        daw: ["Sistemas", "Programación"],
        dam: ["Sistemas", "Programación", "Bases de datos"],
      },
    };

    expect(person.name).toBe("John");
    expect(person.modules.daw[0]).toBe("Sistemas");
    expect(person.modules.dam).toEqual([
      "Sistemas",
      "Programación",
      "Bases de datos",
    ]);
  });

  test("permite leer una propiedad con notación de punto, corchetes o una clave guardada en una variable", function () {
    const person = { address: "123 Main St" };
    const key = "address";

    expect(person.address).toBe("123 Main St");
    expect(person["address"]).toBe("123 Main St");
    expect(person[key]).toBe("123 Main St");
  });
});

describe("Añadir, modificar y eliminar propiedades", function () {
  test("actualiza una propiedad existente y añade otra asignándole un nuevo valor", function () {
    const person: { name: string; [key: string]: unknown } = {
      name: "John",
    };

    person.name = "Jane";
    person.gender = "male";

    expect(person.name).toBe("Jane");
    expect(person.gender).toBe("male");
  });

  test("distingue entre una propiedad presente con valor undefined y una propiedad eliminada", function () {
    const person: { age?: number } = { age: 30 };

    person.age = undefined;
    expect("age" in person).toBe(true);

    delete person.age;
    expect("age" in person).toBe(false);
  });

  test("usa el operador in para comprobar si el objeto contiene una clave, aunque su lectura dé undefined", function () {
    const person: Record<string, unknown> = { name: "John" };

    expect("name" in person).toBe(true);
    expect("nameeeee" in person).toBe(false);
    expect(person.nameeeee).toBeUndefined();
  });
});

describe("Acceso seguro a propiedades anidadas", function () {
  test("permite acceder a un valor anidado y protege el acceso con una comprobación previa de la propiedad", function () {
    const person: Record<string, { daw: string[] }> = {
      modules: {
        daw: ["Sistemas", "Programación"],
      },
    };

    expect(person.modules.daw[0]).toBe("Sistemas");
    expect("modules" in person && person.modules.daw).toEqual([
      "Sistemas",
      "Programación",
    ]);
    expect("moduless" in person && person.moduless.daw).toBe(false);
  });

  test("muestra que una expresión con && puede detener el acceso, mientras que optional chaining devuelve undefined", function () {
    const person: Record<
      string,
      {
        daw: string[];
        daww?: { eee?: { eee?: { fff?: unknown } } };
      }
    > = {
      modules: {
        daw: ["Sistemas", "Programación"],
      },
    };

    expect(person.moduless && person.moduless.daw).toBeUndefined();
    expect(person.moduless?.daw).toBeUndefined();
    expect(person.moduless?.daww?.eee?.eee?.fff).toBeUndefined();
  });
});

describe("Recorrer y convertir las propiedades de un objeto", function () {
  test("obtiene las claves, los valores y las parejas clave-valor en el orden de enumeración", function () {
    const person = {
      name: "John",
      address: "123 Main St",
      modules: {
        daw: ["Sistemas", "Programación"],
      },
    };

    expect(Object.keys(person)).toEqual(["name", "address", "modules"]);
    expect(Object.values(person)).toEqual([
      "John",
      "123 Main St",
      { daw: ["Sistemas", "Programación"] },
    ]);
    expect(Object.entries(person)).toEqual([
      ["name", "John"],
      ["address", "123 Main St"],
      ["modules", { daw: ["Sistemas", "Programación"] }],
    ]);
  });

  test("recorre las propiedades con for...in y lee cada valor usando la clave obtenida", function () {
    const person: Record<string, unknown> = {
      name: "John",
      address: "123 Main St",
    };
    const properties: [string, unknown][] = [];

    for (const key in person) {
      properties.push([key, person[key]]);
    }

    expect(properties).toEqual([
      ["name", "John"],
      ["address", "123 Main St"],
    ]);
  });

  test("recorre las parejas de Object.entries y permite iterar solo las claves con Object.keys y forEach", function () {
    const person: Record<string, unknown> = {
      name: "John",
      address: "123 Main St",
    };
    const entries: [string, unknown][] = [];
    const keysAndValues: [string, unknown][] = [];

    for (const [key, value] of Object.entries(person)) {
      entries.push([key, value]);
    }

    Object.keys(person).forEach((key) => {
      keysAndValues.push([key, person[key]]);
    });

    expect(entries).toEqual([
      ["name", "John"],
      ["address", "123 Main St"],
    ]);
    expect(keysAndValues).toEqual(entries);
  });
});

describe("Abreviatura de propiedades y destructuración", function () {
  test("asigna una variable a una propiedad con el mismo nombre y muestra la forma abreviada del literal", function () {
    const hobbies = ["reading", "traveling", "coding"];
    const personWithExplicitProperty = {
      name: "Alice",
      age: 25,
      hobbies: hobbies,
    };
    const personWithShorthandProperty = {
      name: "Alice",
      age: 25,
      hobbies,
    };

    expect(personWithExplicitProperty.hobbies).toEqual(hobbies);
    expect(personWithShorthandProperty.hobbies).toEqual(hobbies);
  });

  test("extrae una propiedad, renombra otra y recoge el resto de propiedades en un nuevo objeto", function () {
    const person = {
      name: "Alice",
      age: 25,
      hobbies: ["reading", "traveling", "coding"],
    };

    const { age, name: personName, ...restPerson } = person;

    expect(age).toBe(25);
    expect(personName).toBe("Alice");
    expect(restPerson).toEqual({
      hobbies: ["reading", "traveling", "coding"],
    });
  });
});

type Person = {
  name: string;
  age: number;
  address?: string;
  [clave: string]: unknown;
};

describe("Propiedades opcionales y claves dinámicas en tipos de objeto", function () {
  test("acepta objetos con una propiedad opcional presente o ausente y permite claves adicionales con valores desconocidos", function () {
    const personWithAddress: Person = {
      name: "Pepe",
      age: 12,
      address: "Majadahonda",
    };
    const personWithoutAddress: Person = {
      name: "Pepe",
      age: 12,
    };
    const personWithExtraProperty: Person = {
      name: "Pepe",
      age: 12,
      modules: ["sistemas", "base de datos"],
    };

    expect(personWithAddress.address).toBe("Majadahonda");
    expect(personWithoutAddress.address).toBeUndefined();
    expect(personWithExtraProperty.modules).toEqual([
      "sistemas",
      "base de datos",
    ]);
    expectTypeOf(personWithExtraProperty.modules).toEqualTypeOf<unknown>();
  });
});

type Student = Person & {
  modules: string[];
};

describe("Composición de tipos mediante intersecciones", function () {
  test("combina las propiedades de Person con una lista de módulos tipada para Student", function () {
    const person: Person = {
      name: "Pepe",
      age: 12,
      address: "Majadahonda",
    };
    const student: Student = { ...person, modules: [] };

    expect(student).toEqual({
      name: "Pepe",
      age: 12,
      address: "Majadahonda",
      modules: [],
    });
    expectTypeOf(student.modules).toEqualTypeOf<string[]>();
  });
});

interface Casa {
  direccion: string;
  habitaciones: number;
}

describe("Declaración de interfaces y extensión de contratos", function () {
  test("crea un objeto Casa con los campos obligatorios que define su interfaz", function () {
    const casa: Casa = {
      direccion: "Majadahonda",
      habitaciones: 3,
    };

    expect(casa).toEqual({
      direccion: "Majadahonda",
      habitaciones: 3,
    });
  });

  interface Atico extends Casa {
    altura: number;
  }

  test("extiende la interfaz Casa para exigir también la altura propia de un ático", function () {
  const atico: Atico = {
    direccion: "Majadahonda",
    habitaciones: 1,
    altura: 5,
  };

  expect(atico).toEqual({
    direccion: "Majadahonda",
    habitaciones: 1,
    altura: 5,
  });
  expectTypeOf(atico).toMatchTypeOf<Casa>();
  });
});
