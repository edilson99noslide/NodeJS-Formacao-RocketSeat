# Start Node.js

O servidor fica em src/server.js

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

criando um script

```
"scripts": {
    "dev": "node --watch src/server.js"
  }
```

# Conceitos

<h3>Especificar recursos iternos no node</h3>
* import http from 'node:http';

<h3>Stateless vs StateFull</h3>
* Stateless: Salva em arquivos externos como banco de dados, arquivos de textos e derivados, isso faz com que os dados não se percam ao derrubar e startar a aplicação.
* StateFull: Salva na memória, então quando o servidor é derrubado esses dados também são, pois dependem da memória e podem em algum momento serem alterados.

<h3>Cabeçalhos (Header)</h3>
* São metadados, ou seja, informações complementares que não tem relação com os dados transitados entre o back e front, ou seja, o corpo da requisição (body)

Referencia: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers

<h3>HTTP Status Code</h3>
* Código 100 - 199: Informativos (não são muito usados, mas servem para indicar alguma informação)
* Código 200 - 299: Indicam sucesso (200 - ok e 201 - criado com sucesso!)
* Código 300 - 399: Indicam redirecionamento (301 - rota mudou permanentemente e 302 - rota mudou temporariamente)
* Código 400 - 499: Indicam erros do lado do cliente (400 - corpo da requisição errada e 404 - recurso não encontrado)
* Código 500 - 599: Indicam erros do lado do servidor (500 - erro do servidor)

Referencia: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

<h3>Readable Streams vs Writable Streams</h3>
* Readable Streams é quando você lê um arquivo aos poucos (leitura)
* Writable Streams envia aos poucos um vídeo, uma música (escrita)
* Transformable Streams que lê um arquivo e escreve (transformação)

<h3>Buffer</h3>
* O Buffer no Node.js é uma API usada para armazenar e manipular dados binários.
* É uma representação de um espaço na memória do computador usado para transitar dados de uma maneira muito rápida, pois ele lê o dado
de forma binária, essa maneira é mais rápida do que uma string.
* São representados por dados hexadecimais, se você criar uma variável buffer com o valor de 
"Olá!" o console.log() irá retornar a classe Buffer e o valor em hexadecimal.
* Converter um buff para JSON irá retornar um decimal.
```js
const buf = Buffer.from("Olá!");

console.log(buf); 

// retorna <Buffer 4f 6c c3 a1>
// Buffer é a classe e cada elemento é a representação do caractere em hexadecial (base 123456789ABCDEF)
```

<h3>Síncrono e Assíncrono</h3>

* Async: Garante que uma função será assíncrona, ou seja, não precise necessáriamente
executar na ordem.
* Await: Garante que o código seja lido em sequência.

# Utilizações

* Streams Readable: São streams de leitura, elas são classes que estendem
de Readable, é obrigatório ter o método _read() nesse método você utiliza
o this.push(variável) para retornar o valor

```js
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    const buf = Buffer.from(String(i + ', ')); // Saída em Buffer e espera uma string no seu parâmetro

    setTimeout(() => {
      i > 100 ? this.push(null) : this.push(buf); // this.push(variável) para exibir
    }, 1000);
  }
}
```

* Streams Writable: São streams de escrita somente processa o dado, nunca irá retornar algo (retornar é diferente de printar!),
ela também tem 3 parâmetros: 
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

* Streams Transformable: São streams de transformação, ela obrigatóriamente 
precisa realizar uma leitura, trasformar esse dado lido e escrever, ela estende de Transform
e precisa ter obrigatóriamente o método _transform com os parâmetros:
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

* Como executar as streams
```js
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
```

* Como impedir o acesso de propriedades de uma classe, utilize o # antes da propriedade para
permitir somente acessar os métodos
```js
export class Database {
  #database = {}; // Agora não será mais possível acessar database.database

  select(table){
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data){
    Array.isArray(this.#database[table])
      ? this.#database[table].push(data)
      : (this.#database[table] = [data]);

    return data;
  }
}
```

* Biblioteca fs/promises é utilizada para manipular arquivos, a fs/primises é mais "atual" do que
a fs antiga, mas para lidar com streams deve-se usar somente a lib fs.
```js
import fs from 'node:fs/promises';
```

* Biblioteca para id únicos aleatórios randomUUID - Identificador Único Universal (Universally unique identifier)
```js
import { randomUUID } from 'node:crypto';
```