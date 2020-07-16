const validator = require("validator");
const Op = require("sequelize").Op;
const User = require("../db/User");
module.exports = async (req, res, next) => {
  try {
    let { email, phone_num, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: "email is required" });
    }
    if (!phone_num) {
      return res
        .status(400)
        .json({ status: 400, message: "ephone is required" });
    }
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: String(email) }, { phone_num: String(phone_num) }],
      },
    });
    if (user)
      return res
        .status(409)
        .json({ status: 409, message: "user is already signed up" });

    if (email && !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: 400, message: "email is not valid" });
    }
    if (phone_num && !validator.isNumeric(phone_num)) {
      return res
        .status(400)
        .json({ status: 400, message: "phone is not valid" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: 400, message: "password is required" });
    } else {
      if (String(password).length < 8) {
        return res.status(401).json({
          status: 401,
          message: "password must be 8 character",
        });
      }
    }
    next();
  } catch (e) {
    console.log(e);
  }
};
