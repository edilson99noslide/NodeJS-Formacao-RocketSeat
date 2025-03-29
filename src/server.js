import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(`HTTP = ${method} - URL = ${url}`);

  if(method === 'GET' && url === '/users') {
    return res
      .writeHead(200, {'content-type': 'application/json'})
      .end(JSON.stringify(users));
  }

  if(method === 'POST' && url === '/users') {
    const user = {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com'
    };

    users.push(user);

    return res.writeHead(201, {'content-type': 'application/json'}).end(JSON.stringify(user));
  }

  return res
    .writeHead(404, {'content-type': 'application/json'})
    .end(JSON.stringify({'error': 'Recurso não encontrado!'}));
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});