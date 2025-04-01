import { randomUUID } from 'node:crypto';
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, response) => {
      const users = database.select('users');

      return response.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: "/user",
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
  }
];