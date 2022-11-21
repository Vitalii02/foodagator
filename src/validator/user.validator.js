const LIVR = require("livr");

function userValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    email: ["required", "email"],
    password: ["required", "string", { min_length: 10 }],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  userValidator,
};
