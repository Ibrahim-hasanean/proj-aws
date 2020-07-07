const Nexmo = require("nexmo");
const createCode = require("crypto-random-string");
require("dotenv").config();
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_KEY,
  apiSecret: process.env.NEXMO_SECRET,
});
module.exports = async (user) => {
  let code = createCode({ length: 4 });
  const from = "Vonage APIs";
  //const to = "970597801611";
  const text = `your verification code: ${code} `;
  to = `97${user.phone}`;
  nexmo.message.sendSms(from, to, text, async (err, data) => {
    if (err) throw new Error("somthing wrong");
    //yo should setcode in database !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return "message is sent";
  });
};
