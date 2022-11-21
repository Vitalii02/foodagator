const LIVR = require("livr");

function referralValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    email: ["required", "string"],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  referralValidator,
};
