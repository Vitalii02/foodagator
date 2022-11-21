const {
  DB_LIKE_OWNER,
  DB_POST_COMMENT_TITLE,
  DB_USER_TITLE,
  DB_POST_TITLE,
} = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const LikeOwner = sequelize.define(DB_LIKE_OWNER, {
    userId: {
      type: Sequelize.INTEGER,
    },
    commentId: {
      type: Sequelize.STRING,
    },
  });
  LikeOwner.associate = (models) => {
    models.LikeOwner.belongsTo(models.PostComment, {
      as: DB_POST_COMMENT_TITLE,
    });
    models.LikeOwner.belongsTo(models.Post, {
      as: DB_POST_TITLE,
    });
    models.LikeOwner.belongsTo(models.User, {
      as: DB_USER_TITLE,
    });
  };
  return LikeOwner;
};
