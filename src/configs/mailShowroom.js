const nodeMailer = require("nodemailer");
const email = process.env.EMAIL_SHOWROOM;
const pass = process.env.PASSWORD_SHOWROOM;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

const ConfigEmailShowroom = () => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: email,
      pass: pass,
    },
  });
  return transporter;
};

module.exports = ConfigEmailShowroom;
