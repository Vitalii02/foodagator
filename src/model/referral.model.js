const { DB_REFERRAL_TITLE } = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const Referral = sequelize.define(DB_REFERRAL_TITLE, {
    userId: {
      type: Sequelize.INTEGER,
    },
    batchNumber: {
      type: Sequelize.INTEGER,
    },
    sendReferralLinkToEmail: {
      type: Sequelize.STRING,
    },
    referralCode: {
      type: Sequelize.STRING,
    },
    isOpenedLink: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    registerUserIdByReferral: {
      type: Sequelize.INTEGER,
    },
    isActivated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Referral;
};
