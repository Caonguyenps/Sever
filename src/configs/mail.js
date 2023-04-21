const nodeMailer = require("nodemailer");
const email = process.env.EMAIL;
const pass = process.env.PASSWORD;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

const ConfigEmail = () => {
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

module.exports = ConfigEmail;
