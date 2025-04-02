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
    method: "PUT",
    path: buildRoutePath("/user/:id"),
    handler: async (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;

      database.update('users', id, {
        name,
        email
      });

      return response.writeHead(200).end();
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/user/:id"),
    handler: async (request, response) => {
      const { id } = request.params;

      database.delete('users', id);

      return response.writeHead(204).end();
    }
  }
];