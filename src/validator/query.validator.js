const LIVR = require("livr");

function queryValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    id: "positive_integer",
    name: "string",
    cousine: "string",
    page: "positive_integer",
    limit: "positive_integer",
    sort: ["string", { one_of: ["ASC", "DESC"] }],
    fromPrice: "positive_integer",
    toPrice: "positive_integer",
    character: { one_of: ["default", "system"] },
  });
  const validQuery = validator.validate(req.query);
  if (!validQuery) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  queryValidator,
};
