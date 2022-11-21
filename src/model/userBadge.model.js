const { DB_USER_REFERRAL_BADGE } = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const UserReferralBadge = sequelize.define(DB_USER_REFERRAL_BADGE, {
    userId: {
      type: Sequelize.INTEGER,
    },
    imageLink: {
      type: Sequelize.STRING,
    },
  });
  return UserReferralBadge;
};
