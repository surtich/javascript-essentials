import { peticionHttp } from "./utils.ts";

function asyncAdd(
  x: number,
  y: number,
  continuation: (resultado: number) => void,
) {
  peticionHttp(
    `http://localhost:3000/add?a=${x}&b=${y}`,
    function (err, result) {
      continuation(result.result);
    },
  );
}

function asyncMultiply(
  x: number,
  y: number,
  continuation: (resultado: number) => void,
) {
  peticionHttp(
    `http://localhost:3000/multiply?a=${x}&b=${y}`,
    function (err, result) {
      continuation(result.result);
    },
  );
}

asyncAdd(4, 5, function (result) {
  asyncMultiply(result, 2, function (result) {
    console.log(result);
  });
});


