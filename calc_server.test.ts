import { afterAll, beforeAll, expect, test } from "vitest";
import { app } from "./calc_server";

let baseUrl: string;
let server: ReturnType<typeof app.listen> | null = null;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    //@ts-ignore
    server = app.listen(0, resolve);
  });
  if (!server) {
    throw new Error("El servidor no se ha iniciado");
  }

  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("No se pudo obtener el puerto del servidor");
  }
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  if (!server) {
    return;
  }

  const runningServer = server;
  await new Promise<void>((resolve, reject) => {
    runningServer.close((error) => (error ? reject(error) : resolve()));
  });
});

async function getResult(path: string): Promise<unknown> {
  const response = await fetch(`${baseUrl}${path}`);
  expect(response.status).toBe(200);
  return (await response.json()).result;
}

test("add suma dos números", async () => {
  expect(await getResult("/add?a=3&b=4")).toBe(7);
});

test("concat concatena dos cadenas", async () => {
  expect(await getResult("/concat?a=hola&b=%20mundo")).toBe("hola mundo");
});

test("multiply multiplica dos números", async () => {
  expect(await getResult("/multiply?a=3&b=4")).toBe(12);
});

test("inc incrementa un número", async () => {
  expect(await getResult("/inc?value=4")).toBe(5);
});

test("double duplica un número", async () => {
  expect(await getResult("/double?value=4")).toBe(8);
});

test("isEven indica si un número es par", async () => {
  expect(await getResult("/isEven?value=4")).toBe(true);
  expect(await getResult("/isEven?value=3")).toBe(false);
});

test("responde con 400 cuando faltan parámetros numéricos", async () => {
  const response = await fetch(`${baseUrl}/add?a=3`);

  expect(response.status).toBe(400);
  expect(await response.json()).toEqual({ error: "Parámetros numéricos inválidos" });
});
