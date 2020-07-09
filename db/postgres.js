const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres_admin",
  host: "sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com",
  database: "sec_db",
  password: "Eng1061995",
  port: 5432,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  user: "postgres_admin",
  host: "sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com",
  database: "sec_db",
  password: "Eng1061995",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
/*
postgres :
PG_USER =  postgres_admin
PG_HOST = sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com
PG_DATABASE = sec_db
PG_PASSWORD = Eng1061995
PG_PORT = 5432
*/
