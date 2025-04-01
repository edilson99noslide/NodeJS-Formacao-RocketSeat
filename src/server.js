import http from 'node:http';
import { json } from "./middlewares/json.js";
import {Database} from "./database.js";

const database = new Database();

const server = http.createServer(async(req, res) => {
  const { method, url } = req;

  // Middleware
  await json(req, res);

  console.log(`Requisição feita: ${method} ${url}`, req.body);

  // GET
  if(method === 'GET' && url === '/users') {
    const users = database.select('users');

    return res.end(JSON.stringify(users));
  }

  // POST
  if(method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert('users', user);

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