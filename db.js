const { Pool } = require("pg");

const pool = new Pool({
  user: "akinori.nakayama",
  host: "localhost",
  database: "todoapp",
  password: "0223",
  port: 5432,
});

module.exports = pool;
