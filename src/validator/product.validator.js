const LIVR = require("livr");

function productValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    cousine: ["required", "string", { max_length: 10 }],
    name: ["required", "string", { max_length: 10 }],
    price: ["required", "decimal"],
    imageUrl: ["required", "string"],
    isFavorite: ["required"],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  productValidator,
};
