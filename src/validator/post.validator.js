const LIVR = require("livr");

function postValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    title: ["required", "string", { max_length: 25 }],
    text: ["required", "string", { max_length: 3000 }],
    theme: ["required", "string", { max_length: 25 }],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

function commentValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    comment: ["required", "string", { max_length: 1000 }],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  postValidator,
  commentValidator,
};
