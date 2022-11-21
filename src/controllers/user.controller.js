const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../model/db");

const BCRYPT_SALT_ROUNDS = 10;
const GIVE_BADGE_FROM_USER = 3;

exports.register = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Error data");
    }
    const foundUser = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (foundUser) {
      throw new Error("This email address is already in use");
    }
    const hashPassword = await bcrypt.hash(
      req.body.password,
      BCRYPT_SALT_ROUNDS
    );
    const user = await db.User.create({
      email: req.body.email,
      password: hashPassword,
    });
    if (req.query.referralCode) {
      const referral = await db.Referral.findOne({
        where: {
          isActivated: false,
          referralCode: req.query.referralCode,
          sendReferralLinkToEmail: req.body.email,
        },
      });
      if (!referral) {
        throw new Error("referral code already activated");
      }
      await referral.update({
        registerUserIdByReferral: user.id,
        isActivated: true,
      });
      const data = await db.Referral.findAll({
        where: {
          userId: referral.userId,
          isActivated: true,
          batchNumber: referral.batchNumber,
        },
      });
      const activatedReferralCode = data.map((el) => el.referralCode);
      if (activatedReferralCode.length % GIVE_BADGE_FROM_USER === 0) {
        await db.BadgeUser.create({
          userId: referral.userId,
          imageLink: process.env.BADGE_FROM_USER,
        });
      }
    }
    return res.status(201).json({ message: "User has been created!" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Error data");
    }
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new Error("User does not exist");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      throw new Error("Error password or email");
    }
    const { password, ...data } = user.toJSON();
    const token = jwt.sign(data.id, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
