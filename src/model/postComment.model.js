const {
  DB_POST_COMMENT_TITLE,
  DB_POST_TITLE,
  DB_LIKE_OWNER,
  DB_USER_TITLE,
} = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const PostComment = sequelize.define(DB_POST_COMMENT_TITLE, {
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: "default",
    },
    likeCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
  PostComment.associate = (models) => {
    models.PostComment.belongsTo(models.Post, {
      as: DB_POST_TITLE,
    });
    models.PostComment.belongsTo(models.likeOwner, {
      as: DB_LIKE_OWNER,
    });
    models.PostComment.belongsTo(models.User, {
      as: DB_USER_TITLE,
    });
  };
  return PostComment;
};
