export class Database {
  #database = {};

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