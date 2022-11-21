const db = require("../model/db");

exports.doGetCartById = async (userId) => {
  if (!userId) {
    throw new Error("Wrong input data");
  }
  const cart = await db.Cart.findOne({ where: { id: userId } });

  if (!cart) {
    throw new Error("Cart does not exist");
  }
  return cart;
};

exports.foundProduct = async (productId) => {
  if (!productId) {
    throw new Error("Wrong input data");
  }
  const product = await db.Product.findOne({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product does not exist");
  }
  return product;
};
