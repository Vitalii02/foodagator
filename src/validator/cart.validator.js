const LIVR = require("livr");

function cartValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    userId: ["required", "positive_integer"],
    status: ["required", { one_of: ["not paid", "paid"] }],
    price: ["required", "decimal"],
    amount: ["required", "decimal"],
    totalPrice: ["required", "decimal"],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

function idValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    id: ["positive_integer"],
  });

  const validData = validator.validate(req.query);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

function addOrRemoveValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    productId: ["required", "positive_integer"],
    quantity: ["required", "decimal"],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  cartValidator,
  idValidator,
  addOrRemoveValidator,
};
