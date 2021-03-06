var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let piwikTracker = require("./middleware/matomo");
const validator = require("./middleware/validator");
const cors = require("cors");
const User = require("./db/User");
require("dotenv").config();
const port = process.env.PORT || 4000;
var app = express();
const sequalize = require("./db/sequalize");
// sequalize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((e) => {
//     console.error("Unable to connect to the database:", e);
//   });
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));

//require("./db/postgres");
app.use(cors());
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   piwikTracker({
//     siteId: 1,
//     piwikUrl: process.env.MATOMO_URL,
//     baseUrl: process.env.BASE_URL,
//     piwikToken: process.env.MATOMO_TOKEN,
//   })
// );

app.get("/getusers", async function (req, res, next) {
  let user = await User.findAll();
  res.send(user);
});
app.get("/delete", async (req, res) => {
  let { email } = req.body;
  let deletedUser = await User.findOne({ where: { email: String(email) } });
  deletedUser.destroy();
  res.send(deletedUser);
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
  console.log(`listen on ${port}`);
});
module.exports = app;
