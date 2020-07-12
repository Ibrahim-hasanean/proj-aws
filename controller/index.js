const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendmail = require("../middleware/sendmail");
const confirmCode = require("../middleware/confirmCode.js");
//const sendSMS = require("../utils/sendSMS.js");
const Op = require("sequelize").Op;
const User = require("../db/User");
const moment = require("moment");
module.exports = {
  signup: async (req, res, next) => {
    try {
      let {
        phone_num,
        email,
        password,
        city,
        first_name,
        last_name,
      } = req.body;
      console.log("in sign up");
      password = bcrypt.hashSync(password, 10);
      let newUser;
      let created_on = moment().format("MM-DD-YYYY");
      let signup_time = moment().format("LTS");
      if (email) {
        newUser = await User.create({
          email,
          password,
          first_name,
          last_name,
          phone_num,
          created_on,
        });
        sendmail(newUser, "verification code");
      }
      res
        .status(200)
        .json({ status: 200, message: "sign up success and code is sent" });
    } catch (e) {
      console.log(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let { phone_num, email, password } = req.body;
      console.log("from login");
      let user = await User.findOne({
        where: {
          [Op.or]: [{ email: String(email) }, { phone_num: String(phone_num) }],
        },
      });
      if (!user) return next({ status: 400, message: "user not found" });
      let truePassword = await bcrypt.compareSync(password, user.password);
      if (!truePassword)
        return res
          .status(401)
          .json({ status: 401, message: "password is wrong" });
      // if (!user.is_verified)
      //   return res
      //     .status(400)
      //     .json({ status: 400, message: "user email is not verified" });
      let token = jwt.sign({ userId: user.id }, "process.env.JWT_SECRET", {
        expiresIn: "12h",
      });
      return res.status(200).json({
        status: 200,
        message: "login success",
        token,
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone_num: user.phone_num,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
  facebookLogin: async (req, res, next) => {
    let { userData } = req.body;
    let { email, name, id } = userData;
    let userExist = await User.findOne({
      where: { [Op.or]: [{ fb_id: String(id) }, { email: email }] },
    });
    if (!userExist) {
      let signup_date = moment().format("MM-DD-YYYY");
      let signup_time = moment().format("LTS");
      let newUser = await User.create({
        email,
        first_name: name,
        fb_id: id,
        signup_date,
        signup_time,
      });
      let token = jwt.sign({ userID: newUser.id }, "my jwt secret key", {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ status: 200, message: "first facebook login success", token });
    }
    let token = jwt.sign({ userID: userExist.id }, "my jwt secret key", {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ status: 200, message: "facebook login success", token });
  },
  googleLogin: async (req, res, next) => {
    let { userData } = req.body;
    let { email, name, id } = userData;
    let userExist = await User.findOne({
      where: { [Op.or]: [{ google_id: String(id) }, { email: email }] },
    });
    if (!userExist) {
      let signup_date = moment().format("MM-DD-YYYY");
      let signup_time = moment().format("LTS");
      let newUser = await User.create({
        email,
        first_name: name,
        google_id: id,
        signup_date,
        signup_time,
      });
      console.log(newUser);
      let token = jwt.sign({ userID: newUser.id }, "my jwt secret key", {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ status: 200, message: "first google login success", token });
    }

    let token = jwt.sign({ userID: userExist.id }, "my jwt secret key", {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ status: 200, message: "google login success", token });
  },
  confirmCode: async (req, res, next) => {
    let { email, phone_num, code } = req.body;
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: String(email) }, { phone_num: String(phone_num) }],
      },
    });
    if (!user)
      return res.status(400).json({ status: 400, message: "user not found" });
    if (code !== user.verification_code)
      return res.status(400).json({ status: 400, message: "code is wrong" });
    if (code == user.verification_code) {
      let updateUser = await User.update(
        { is_verified: true },
        { where: { id: user.id } }
      );
      console.log(updateUser);
      res.status(200).json({ status: 200, message: "code is true" });
    }
  },
  forgetPassword: async (req, res, next) => {
    let { email, phone_num } = req.body;
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: String(email) }, { phone_num: String(phone_num) }],
      },
    });
    if (email) {
      sendmail(user, "your code");
    }
    res.status(200).json({ status: 200, message: "code is sent" });
  },
  verify: async (req, res, next) => {
    let { phone_num, email, code } = req.body;
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: String(email) }, { phone_num: String(phone_num) }],
      },
    });
    if (!user)
      return res.status(400).json({ status: 400, message: "user not found" });
    if (code !== user.verification_code)
      return res.status(400).json({ status: 400, message: "code is wrong" });
    if (code == user.verification_code) {
      let updateUser = await User.update(
        { is_verified: true },
        { where: { id: user.id } }
      );
      res
        .status(200)
        .json({ status: 200, message: "your account is verified" });
    }
  },
  newPassword: async (req, res, next) => {
    let { email, phone_num, code, password } = req.body;
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: String(email) }, { phone_num: String(phone_num) }],
      },
    });
    if (!user)
      return res.status(400).json({ status: 400, message: "user not found" });
    // if (code !== user.verification_code)
    //   return res.status(400).json({ status: 400, message: "code is wrong" });
    let newPassword = bcrypt.hashSync(password, 12);
    let newUser = await User.update(
      { password: newPassword },
      { where: { id: user.id } }
    );
    return res
      .status(200)
      .json({ status: 200, message: "password reset success" });
  },
};
