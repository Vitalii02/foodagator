const {
  DB_USER_TITLE,
  DB_LIKE_OWNER,
  DB_POST_TITLE,
  DB_CART_PRODUCT_TITLE,
} = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(DB_USER_TITLE, {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  User.associate = (models) => {
    models.User.belongsToMany(models.Cart, {
      as: DB_CART_PRODUCT_TITLE,
    });
    models.User.belongsToMany(models.Post, {
      as: DB_POST_TITLE,
    });
    models.User.belongsToMany(models.likeOwner, {
      as: DB_LIKE_OWNER,
    });
  };
  return User;
};
