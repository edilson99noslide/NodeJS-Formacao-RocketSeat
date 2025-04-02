# Start Node.js

O servidor fica em `src/server.js`

```js
// import
import http from 'node:http';

// criando um server
const server = http.createServer((req, res) => {
    return res.end('Hello World!');
});

// listando a porta
server.listen(3333);
```

Criando um script no `package.json`:

```json
"scripts": {
    "dev": "node --watch src/server.js"
}
```

---

# Conceitos

### Especificar recursos internos no Node.js

- `import http from 'node:http'`

### Stateless vs Stateful

- **Stateless**: Salva em arquivos externos como banco de dados, arquivos de textos e derivados, garantindo que os dados não se percam ao reiniciar a aplicação.
- **Stateful**: Salva os dados na memória, então quando o servidor é derrubado esses dados também são perdidos, pois dependem da memória.

### Cabeçalhos (Header)

- São metadados, ou seja, informações complementares que não têm relação com os dados transitados entre o backend e frontend.

Referência: [MDN - Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers)

### HTTP Status Code

- **100 - 199**: Informativos.
- **200 - 299**: Indicam sucesso (ex: `200 OK`, `201 Created`).
- **300 - 399**: Indicam redirecionamento (ex: `301 Moved Permanently`, `302 Found`).
- **400 - 499**: Indicam erros do lado do cliente (ex: `400 Bad Request`, `404 Not Found`).
- **500 - 599**: Indicam erros do lado do servidor (ex: `500 Internal Server Error`).

Referência: [MDN - Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

### Readable Streams vs Writable Streams

- **Readable Streams**: Permitem leitura de dados aos poucos.
- **Writable Streams**: Enviam dados de forma progressiva.
- **Transformable Streams**: Leem e transformam os dados antes de escrever.

### Buffer

- O `Buffer` no Node.js armazena e manipula dados binários.
- É mais rápido do que manipular strings.

```js
const buf = Buffer.from("Olá!");
console.log(buf);
// <Buffer 4f 6c c3 a1>
// Buffer é a classe e cada elemento é a representação do caractere em hexadecial (base 123456789ABCDEF)
```

### Síncrono e Assíncrono

- **Async**: Garante que uma função será assíncrona, ou seja, não precise necessáriamente
  executar na ordem.
- **Await**: Garante que o código seja lido em sequência.

### Request

- **Query parameters**: URL Stateful, são filtros, paginação, não obrigatórios `url/api/user?search=admin`
- **Route parameters**: Identificação de recurso, identificação de um dado de entidade `url/api/user/1`
- **Body**: Corpo da requisição com os dados

```json
{
  "name": "Admin",
  "email": "admin@gmail.com"
}
```

# Utilizações

### Streams Readable

- **Streams Readable**: São streams de leitura, elas são classes que estendem
  de Readable, é obrigatório ter o método _read() nesse método você utiliza
  o this.push(variável) para retornar o valor

```js
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    const buf = Buffer.from(String(i + ', '));

    setTimeout(() => {
      i > 100 ? this.push(null) : this.push(buf);
    }, 1000);
  }
}
```

### Streams Writable

- **Streams Writable**: São streams de escrita somente processa o dado, nunca irá retornar algo (retornar é diferente de printar!),
  ela também tem 3 parâmetros
1. chunk - Retorno da escrita
2. encoding - Como que essa informação da chunk está codificada
3. callback - Função que será retornada no final da execução

```js
class MultiplyByTenStream extends Writable {
  _write(chunk, enc, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}
```

### Streams Transformable

- **Streams Transformable**: São streams de transformação, ela obrigatóriamente
  precisa realizar uma leitura, trasformar esse dado lido e escrever, ela estende de Transform
  e precisa ter obrigatóriamente o método _transform com os parâmetros
1. chunk - Retorno da escrita
2. encoding - Como que a informação da chunk está codificada
3. callback - Função que será executada no final da execução

```js
class InverseNumberStream extends Transform {
  _transform(chunk, enc, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}
```

### Como executar as streams

```js
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
```

### Protegendo propriedades de uma classe

- **Como impedir o acesso de propriedades de uma classe**: Utilize o # antes da propriedade para
permitir somente acessar os métodos

```js
export class Database {
  #database = {}; // Agora não será mais possível acessar diretamente

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    Array.isArray(this.#database[table])
      ? this.#database[table].push(data)
      : (this.#database[table] = [data]);
    return data;
  }
}
```

### Manipulação de arquivos com `fs/promises`

- **Biblioteca fs/promises**: É utilizada para manipular arquivos, a fs/primises é mais "atual" do que
  a fs antiga, mas para lidar com streams deve-se usar somente a lib fs.

```js
import fs from 'node:fs/promises';
```

### Gerando UUIDs com `crypto`

- **Biblioteca para id únicos aleatórios randomUUID**: Identificador Único Universal (Universally unique identifier)

```js
import { randomUUID } from 'node:crypto';
```