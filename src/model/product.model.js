const { DB_PRODUCT_TITLE } = require("../utils/constants");

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(DB_PRODUCT_TITLE, {
    cousine: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    isFavorite: {
      type: Sequelize.BOOLEAN,
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.CartProduct);
  };
  return Product;
};
