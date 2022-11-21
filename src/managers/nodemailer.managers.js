const nodemailer = require("nodemailer");

exports.sendReferralMail = async (sendReferralLinkToEmail, referralCode) => {
  let transporter = nodemailer.createTransport({
    service: process.env.GMAIL_SERVICE,
    port: +process.env.GMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.GMAIL_USERS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.GMAIL_USERS,
    to: sendReferralLinkToEmail,
    subject: "Referral link from registaratiom to foodagator.com",
    text: "Referral link from registaratiom to foodagator.com",
    html: `<b>register in links ${[
      process.env.DEFAULT_REFERRAL_URL + referralCode,
    ]} </b>`,
  });
};
