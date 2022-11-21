const {
  DB_POST_TITLE,
  DB_POST_COMMENT_TITLE,
  DB_LIKE_OWNER,
} = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(DB_POST_TITLE, {
    userId: {
      type: Sequelize.INTEGER,
    },
    theme: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
  });
  Post.associate = (models) => {
    models.Post.hasMany(models.PostComment, {
      as: DB_POST_COMMENT_TITLE,
    });
    models.Post.hasMany(models.LikeOwner, {
      as: DB_LIKE_OWNER,
    });
  };
  return Post;
};
