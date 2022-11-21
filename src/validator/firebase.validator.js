const LIVR = require("livr");

function firebaseValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    size: ["required", "integer", { max_length: 10 }],
  });
  const validImageSize = validator.validate(req.files.image);
  if (!validImageSize) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  firebaseValidator,
};
