const db = require("../model/db");
const { deliveryСalculation } = require("../utils/deliveryСalculation");
const { getUserId } = require("../utils/getUserId");
const { doGetCartById, foundProduct } = require("../utils/cartsMethod");

exports.getCartById = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Wrong input data");
    }
    return res.status(200).json(await doGetCartById(req.query.id));
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    if (!req || !req.body || !req.headers) {
      throw new Error("Wrong input data");
    }
    const userId = getUserId(req.headers.authorization);

    await db.sequelize.transaction(async (transaction) => {
      const product = await foundProduct(req.body.productId);
      if (!product) {
        throw new Error("Product does not exist");
      }

      let foundCart = await db.Cart.findOne(
        { where: { userId } },
        { transaction }
      );

      if (!foundCart) {
        foundCart = db.Cart.build({ userId }, { transaction: transaction });
        await foundCart.save({ transaction: transaction });
      }

      await db.CartProduct.create(
        {
          cartId: foundCart.id,
          productId: req.body.productId,
          amount: req.body.quantity,
        },
        { transaction }
      );

      const price = foundCart.price + product.price * req.body.quantity;
      const deliveryPrice = deliveryСalculation(price);
      const totalPrice = deliveryPrice + price;
      await foundCart.update(
        {
          price,
          deliveryPrice,
          totalPrice,
        },
        { transaction }
      );
      return res.status(200).json({ message: "Product added to your cart" });
    });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Wrong input data");
    }
    const userId = getUserId(req.headers.authorization);

    await db.sequelize.transaction(async (t) => {
      const product = await foundProduct(req.body.productId);
      if (!product) {
        throw new Error("Product does not exist");
      }
      let foundCart = await db.Cart.findOne(
        { where: { userId } },
        { transaction: t }
      );

      if (!foundCart) {
        throw new Error("Cart does not exist12");
      }

      const foundProductOfCart = await db.CartProduct.findOne(
        {
          where: { cartId: foundCart.id, productId: req.body.productId },
        },
        { transaction: t }
      );

      if (!foundProductOfCart) {
        throw new Error("You do not have such a product");
      }

      if (foundCart.quantity > req.query.quantity) {
        throw new Error("You don't have that amount of product");
      }
      const price = foundCart.price - product.price * req.body.quantity;
      const deliveryPrice = deliveryСalculation(price);
      const totalPrice = deliveryPrice + price;

      const amountProductFromCarts =
        foundProductOfCart.amount - req.body.quantity;
      if (price < 0) {
        throw new Error("Error price");
      }

      await foundCart.update(
        {
          price,
          deliveryPrice,
          totalPrice,
        },
        { transaction: t }
      );

      await foundProductOfCart.update(
        { amount: amountProductFromCarts },
        { transaction: t }
      );
      return res.status(200).json({ message: "Product remove to your cart" });
    });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    if (!req || !req.query || !req.body) {
      throw new Error("Wrong input data");
    }

    const id = req.query.id;
    await doGetCartById(id);

    await db.Cart.update(req.body, {
      where: { id },
    });

    return res.status(200).json({ message: `Cart id=${id} has been updated!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    if (!req || !req.query) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;
    await doGetCartById(id);

    await db.Cart.destroy({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: `Cart id=${id}, has been deleted!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
