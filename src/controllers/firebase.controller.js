const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = require("../managers/firebase.managers");
const generateRandomLetters = require("../utils/generateRandomLetters");

const ALLOWED_EXTENSION = ["png", "jpg", "jpeg"];

exports.uploadImageInProduct = async (req, res) => {
  try {
    if (!req || !req.files || !req.files.image) {
      throw new Error("Files is missing.");
    }

    const file = req.files.image.data;
    let data = req.files.image.name.split(".")[1];

    if (!ALLOWED_EXTENSION.includes(data)) {
      throw new Error("Wrong file format!");
    }

    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp, process.env.STORAGE_BUCKET);
    const newMetadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(
      storage,
      "product/" + generateRandomLetters.generateRandomLetters() + ".jpg"
    );
    await uploadBytes(storageRef, file, newMetadata);
    const sotageUrl = await getDownloadURL(storageRef);
    return res
      .status(201)
      .json({ message: "Image has been upload!", link: sotageUrl });
  } catch (e) {
    return res.status(400).json({ error: e.name + ":" + e.message });
  }
};
