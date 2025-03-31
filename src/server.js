import http from 'node:http';
import { json } from "../middlewares/json.js";

const users = [];

const server = http.createServer(async(req, res) => {
  const { method, url } = req;

  // Middleware
  await json(req, res);

  console.log(`Requisição feita: ${method} ${url}`, req.body);

  // GET
  if(method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users));
  }

  // POST
  if(method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201, {'content-type': 'application/json'}).end(JSON.stringify(req.body));
  }

  // 404 de rotas
  return res
    .writeHead(404, {'content-type': 'application/json'})
    .end(JSON.stringify({'error': 'Recurso não encontrado!'}));
});

server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});