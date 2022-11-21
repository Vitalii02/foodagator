const { DB_CART_TITLE } = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(DB_CART_TITLE, {
    userId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "not_paid",
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    deliveryPrice: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    totalPrice: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
  });
  Cart.associate = (models) => {
    Cart.hasMany(models.CartProduct);
  };
  return Cart;
};
