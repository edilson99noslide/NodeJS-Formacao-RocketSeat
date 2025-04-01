import { randomUUID } from 'node:crypto';
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: async (request, response) => {
      const users = database.select('users');

      return response.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/user"),
    handler: async (request, response) => {
      console.log('POST');
      const { name, email } = request.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return response.writeHead(201, {'content-type': 'application/json'}).end(JSON.stringify(request.body));
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/user/:id"),
    handler: async (request, response) => {
      return response.end();
    }
  }
];