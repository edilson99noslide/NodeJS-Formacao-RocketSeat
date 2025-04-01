import http from 'node:http';
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async(request, response) => {
  const { method, url } = request;

  // Middleware
  await json(request, response);

  console.log(`request feita: ${method} ${url}`, request.body);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if(route){
    const routeParams = request.url.match(route.path);

    request.params = { ...routeParams.groups };

    return route.handler(request, response);
  }

  // 404 de rotas
  return response
    .writeHead(404, {'content-type': 'application/json'})
    .end(JSON.stringify({'error': 'Recurso não encontrado!'}));
});

server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});