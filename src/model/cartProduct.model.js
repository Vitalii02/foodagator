const { DB_CART_PRODUCT_TITLE } = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const CartProduct = sequelize.define(DB_CART_PRODUCT_TITLE, {
    cartId: {
      type: Sequelize.INTEGER,
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
  });
  CartProduct.associate = (models) => {
    CartProduct.belongsTo(models.Cart);
    CartProduct.belongsTo(models.Product);
  };
  return CartProduct;
};
