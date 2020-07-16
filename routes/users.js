var express = require("express");
var router = express.Router();
/* GET users listing. */
router.get("/private", function (req, res, next) {
  res.send(`herllo from private route mr ${req.user.first_name}`);
});
module.exports = router;
