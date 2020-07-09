var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const validator = require("./middleware/validator");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
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

var sequelize = new Sequelize("sec_db", "postgres_admin", "Eng1061995", {
  host: "sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com",
  port: 5432,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: "postgres",
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: "en",
  dialectOptions: {
    ssl: {
      ca: "certPathDownloadedFromAWS",
    },
  },
});
/*
postgres :
PG_USER =  postgres_admin
PG_HOST = sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com
PG_DATABASE = sec_db
PG_PASSWORD = Eng1061995
PG_PORT = 5432
 */
//"Amazon RDS"
// dialectOptions: {
//   ssl: true,
// }
app.get("/", async function (req, res, next) {
  console.log("from home");
  let user = await sequelize
    .query("SELECT * FROM users", {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
  res.send(user);
});

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
