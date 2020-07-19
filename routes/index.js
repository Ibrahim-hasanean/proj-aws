var express = require("express");
var router = express.Router();

const signUpValidator = require("../middleware/signUpValidator");
const {
  signup,
  login,
  facebookLogin,
  googleLogin,
  forgetPassword,
  confirmCode,
  verify,
  newPassword,
} = require("../controller/index");
/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index");
});

router.get("/aboute", async function (req, res, next) {
  res.send("boute");
});

router.post("/signup", signUpValidator, signup);
router.post("/login", login);
router.post("/facebooklogin", facebookLogin);
router.post("/googlelogin", googleLogin);
router.post("/verify", verify);
router.post("/forgetPassword", forgetPassword);
router.post("/confirmcode", confirmCode);
router.post("/newPassword", newPassword);

module.exports = router;
