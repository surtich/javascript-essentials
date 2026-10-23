import express from "express";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const app = express();

function readNumber(value: unknown): number | undefined {
  if (typeof value !== "string" || value.trim() === "") {
    return undefined;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function sendInvalidParameters(
  response: express.Response,
  message = "Parámetros numéricos inválidos",
) {
  response.status(400).json({ error: message });
}

app.get("/add", (request, response) => {
  const a = readNumber(request.query.a);
  const b = readNumber(request.query.b);
  if (a === undefined || b === undefined) {
    sendInvalidParameters(response);
    return;
  }

  response.json({ result: a + b });
});

app.get("/concat", (request, response) => {
  const a = readString(request.query.a);
  const b = readString(request.query.b);
  if (a === undefined || b === undefined) {
    sendInvalidParameters(response, "Parámetros de texto inválidos");
    return;
  }

  response.json({ result: a + b });
});

app.get("/multiply", (request, response) => {
  const a = readNumber(request.query.a);
  const b = readNumber(request.query.b);
  if (a === undefined || b === undefined) {
    sendInvalidParameters(response);
    return;
  }

  response.json({ result: a * b });
});

app.get("/inc", (request, response) => {
  const value = readNumber(request.query.value);
  if (value === undefined) {
    sendInvalidParameters(response);
    return;
  }

  response.json({ result: value + 1 });
});

app.get("/double", (request, response) => {
  const value = readNumber(request.query.value);
  if (value === undefined) {
    sendInvalidParameters(response);
    return;
  }

  response.json({ result: value * 2 });
});

app.get("/isEven", (request, response) => {
  const value = readNumber(request.query.value);
  if (value === undefined) {
    sendInvalidParameters(response);
    return;
  }

  response.json({ result: value % 2 === 0 });
});

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`Calculator server listening on port ${port}`);
  });
}
