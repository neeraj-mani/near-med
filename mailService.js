const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

const mailService = {
  sendMail: async function (toMail, mailContent) {
    await transporter.sendMail({
      from: `"Abhishek GUPTA" <osmmediaplatform@gmail.com>`,
      to: toMail,
      subject: "nearMed Registration OTP.",
      html: `<h1>OTP:${mailContent}</h1>`,
    });
    return 200;
  },
};

module.exports = mailService;
