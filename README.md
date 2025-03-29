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

```js
"scripts": {
    "dev": "node --watch src/server.js"
  }
```

# Conceitos

<h3>Especificar recursos iternos no node</h3>
- import http from 'node:http';

<h3>Stateless vs StateFull</h3>
- Stateless: Salva em arquivos externos como banco de dados, arquivos de textos e derivados, isso faz com que os dados não se percam ao derrubar e startar a aplicação.
- StateFull: Salva na memória, então quando o servidor é derrubado esses dados também são, pois dependem da memória e podem em algum momento serem alterados.

<h3>Cabeçalhos (Header)</h3>
- São metadados, ou seja, informações complementares que não tem relação com os dados transitados entre o back e front, ou seja, o corpo da requisição (body)

Referencia: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers

<h3>HTTP Status Code</h3>
- <span style="color: white;">100 - 199</span>: Informativos (não são muito usados, mas servem para indicar alguma informação)
- <span style="color: green;">200 - 299</span>: Indicam sucesso (200 - ok e 201 - criado com sucesso!)
- <span style="color: yellow;">300 - 399</span>: Indicam redirecionamento (301 - rota mudou permanentemente e 302 - rota mudou temporariamente)
- <span style="color: orange;">400 - 499</span>: Indicam erros do lado do cliente (400 - corpo da requisição errada e 404 - recurso não encontrado)
- <span style="color: red;">500 - 599</span>: Indicam erros do lado do servidor (500 - erro do servidor)

Referencia: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

