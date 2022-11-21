const db = require("../model/db");
const { Op } = require("sequelize");

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

exports.createProduct = async (req, res) => {
  try {
    if (!req || !req.body) {
      throw new Error("Wrong input data");
    }
    await db.Product.create(req.body);
    return res.status(201).json({ message: "Product has been created!" });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.getProductListWithFilters = async (req, res) => {
  try {
    const options = {};

    if (!req || !req.query) {
      throw new Error("Query invalid");
    }

    const category = req.query.category;
    const name = req.query.name;
    const offset = req.query.offset || DEFAULT_OFFSET;
    const limit = req.query.limit || DEFAULT_LIMIT;
    const sort = req.query.sort || "ASC";
    const fromPrice = req.query.fromPrice;
    const toPrice = req.query.toPrice;

    if (category) {
      options.category = category;
    }
    if (fromPrice && toPrice) {
      options.price = {
        [Op.between]: [fromPrice, toPrice],
      };
    }
    if (name) {
      options.name = {
        [Op.like]: `%name%`,
      };
    }

    const data = await db.Product.findAndCountAll({
      where: options,
      order: [["createdAt", sort]],
      limit,
      offset,
    });
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (!req || !req.query || !req.query.id) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;
    const data = await db.Product.findOne({ where: { id: id } });
    if (!data) {
      throw new Error("Product does not exist");
    }
    await db.Product.update(req.body, {
      where: { id: id },
    });
    return res
      .status(201)
      .json({ message: `Product id=${id}, has been update!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if (!req || !req.query || !req.query.id) {
      throw new Error("Wrong input data");
    }
    const id = req.query.id;
    const data = await db.Product.findOne({ where: { id: id } });
    if (!data) {
      throw new Error("Product does not exist");
    }
    await db.Product.destroy({
      where: { id: id },
    });
    return res
      .status(201)
      .json({ message: `Product id=${id}, has been deleted!` });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
