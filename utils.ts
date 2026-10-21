import { Buffer } from "buffer";
import * as http from "http";

/**
 * Realiza una petición HTTP GET de bajo nivel en Node.js y devuelve el resultado mediante un callback.
 *
 * @param url - La URL del endpoint HTTP al que se desea hacer la petición.
 * @param callback - Función callback que recibe un error opcional y los datos tipados.
 */
export function peticionHttp<T = any>(
  url: string,
  callback: (error: Error | null, resultado: T | null) => void,
): void {
  const req = http.get(url, (res: http.IncomingMessage) => {
    let datosRecogidos = "";

    // Acumulamos los fragmentos de datos que van llegando
    res.on("data", (chunk: Buffer) => {
      datosRecogidos += chunk.toString();
    });

    // Se ejecuta cuando la respuesta ha terminado de llegar por completo
    res.on("end", () => {
      if (
        res.statusCode === undefined ||
        res.statusCode < 200 ||
        res.statusCode >= 300
      ) {
        return callback(
          new Error(`Error HTTP: ${res.statusCode} ${res.statusMessage}`),
          null,
        );
      }

      try {
        const resultado: T = JSON.parse(datosRecogidos);
        callback(null, resultado);
      } catch (error: any) {
        callback(new Error("Error al parsear el JSON: " + error.message), null);
      }
    });
  });

  // Manejo de errores de red
  req.on("error", (error: Error) => {
    callback(error, null);
  });
}
