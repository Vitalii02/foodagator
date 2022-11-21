const db = require("../model/db");
const { generateRandomLetters } = require("../utils/generateRandomLetters");
const { generateRandomNumber } = require("../utils/generateRandomNumbers");
const { getUserId } = require("../utils/getUserId");
const { sendReferralMail } = require("../managers/nodemailer.managers");

const MAX_EMAILS_FROM_REFERRAL = 2;

exports.sendReferralCodeToEmail = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Email is required");
    }
    const userId = getUserId(req.headers.authorization);
    await db.sequelize.transaction(async (transaction) => {
      const sendReferralLinkToEmail = req.body.email.split(",");
      if (
        !Array.isArray(sendReferralLinkToEmail) ||
        sendReferralLinkToEmail.length < MAX_EMAILS_FROM_REFERRAL
      ) {
        throw new Error("Should be 3 letters");
      }
      const batchNumber = generateRandomNumber();
      const arrayReferralUser = [];
      sendReferralLinkToEmail.map((sendReferralLinkToEmail) => {
        const obj = {
          sendReferralLinkToEmail,
          userId,
          batchNumber,
          referralCode: generateRandomLetters(),
        };
        arrayReferralUser.push(obj);
      });
      const data = await db.Referral.bulkCreate(arrayReferralUser, {
        transaction,
      });
      if (!data) {
        throw new Error("Referral code not be generated");
      }
      const userReferralCode = data.map((el) => el.referralCode);
      for (let i = 0; i <= sendReferralLinkToEmail.length - 1; i++) {
        await sendReferralMail(
          sendReferralLinkToEmail[i],
          userReferralCode[i],
          {
            transaction,
          }
        );
      }
      return res.status(200).json({ message: "referral link has been sent" });
    });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.getMyBadge = async (req, res) => {
  try {
    const userId = getUserId(req.headers.authorization);
    const data = await db.BadgeUser.findAll({ where: { userId } });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.isActivatedReferralCode = async (req, res) => {
  try {
    const referralCode = req.query.referralCode;
    const data = await db.Referral.findOne({
      where: { referralCode },
    });
    if (!data) {
      throw new Error("incorrect referral code or already used");
    }
    await data.update({
      isOpenedLink: true,
    });
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
