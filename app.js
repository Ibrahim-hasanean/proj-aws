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
const port = process.env.PORT || 4005;
var app = express();
const sequalize = require("./db/sequalize");
//require("./db/postgres");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/try", async function (req, res, next) {
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
