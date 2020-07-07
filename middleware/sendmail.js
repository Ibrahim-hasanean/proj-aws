const nodemailer = require("nodemailer");
const createCode = require("crypto-random-string");
require("dotenv").config();
module.exports = async (user, subject) => {
  let code = createCode({ length: 4 });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.email,
    to: user.email,
    subject: subject,
    text: "your code: ",
    html: `<b>${code}</b>`,
  });
  //you should set code in database!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  return info;
};
