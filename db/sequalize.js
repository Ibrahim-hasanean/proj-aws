const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  "postgres://postgres:481997@localhost:5432/postgres"
);
// console.log(process.env.PG_PASSWORD);
// var sequelize = new Sequelize(
//   `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
// );
// const { Pool, Client } = require("pg");
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });
// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });
module.exports = sequelize;
