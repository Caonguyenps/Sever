const configMail = require("../configs/mail");
const configMailShowroom = require("../configs/mailShowroom");
const email = process.env.EMAIL;
const emailShowroom = process.env.EMAIL_SHOWROOM;

const sendOtpMail = (mail, otp) => {
  return new Promise(async (resolve, reject) => {
    let options = {
      from: email,
      to: mail,
      subject: "Account Verification",
      html: `
              <h2>OTP code is valid for 5 minutes, please do not give OTP to others!</h2>
              <p>OTP: ${otp}</p>
              `,
    };
    await configMail()
      .sendMail(options)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const sendMailForgotPassword = (mail, token) => {
  return new Promise(async (resolve, reject) => {
    let options = {
      from: email,
      to: mail,
      subject: "Confirm forgot password",
      html: `
              <h2>Click on the link below to update the new password, note the update time is 5 minutes!</h2>
              <a href="http://localhost:3000/account/forgot-password?q=${token}">Click here</a>
              `,
    };
    await configMail()
      .sendMail(options)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = {
  sendOtpMail: sendOtpMail,
  sendMailForgotPassword: sendMailForgotPassword,
};
