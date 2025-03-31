import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, enc, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(`Recebido: ${chunk.toString()} | Transformado: ${transformed}`);

    callback(null, Buffer.from(String(`${transformed}\n`)));
  }
}

// Req => ReadableStream lê
// RES => WritableStream escreve
const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
    .on('finish', () => res.end());
});

server.listen(3334, () => {
  console.log("Servidor rodando na porta 3334");
});