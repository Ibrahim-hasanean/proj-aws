const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (user, subject, code) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ibrahim19970408@gmail.com",
      pass: "123456.!@#asd",
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
