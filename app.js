var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const validator = require("./middleware/validator");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3005;
var app = express();
//require("./db/sequalize");
//require("./db/postgres");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres_admin",
  host: "sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com",
  database: "sec_db",
  password: "Eng1061995",
  port: 5432,
});
// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });
const client = new Client({
  user: "postgres_admin",
  host: "sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com",
  database: "sec_db",
  password: "Eng1061995",
  port: 5432,
});
client
  .connect()
  .then(() => {
    console.log("db connected ");
  })
  .catch((e) => {
    console.log(e);
  });
// client.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   client.end();
// });
app.use("/", indexRouter);
app.use("/users", validator, usersRouter);

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log("listen on 3000");
});
module.exports = app;
