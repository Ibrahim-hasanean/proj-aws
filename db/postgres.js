const { Pool, Client } = require("pg");
const connectionString =
  "postgresql://postgres_admin:Eng1061995@sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com:5432/sec_db";
const pool = new Pool({
  connectionString: connectionString,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  connectionString: connectionString,
});
client
  .connect()
  .then(() => {
    console.log("connect");
  })
  .catch((e) => {
    console.log(e);
  });
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
