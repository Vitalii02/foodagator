const DEFAULT_FILE_PATH = "file.xlsx";

exports.getFile = (req, res) => {
  try {
    res.download(DEFAULT_FILE_PATH);
  } catch (e) {
    console.log(e);
    return res.statusCode(404);
  }
};

exports.uploadFile = (req, res) => {
  try {
    const date = new Date().toJSON();
    return res
      .status(200)
      .json({ message: `File has been updated at ${date}` });
  } catch (e) {
    console.log(e);
    return res.statusCode(404).json({ message: e });
  }
};
