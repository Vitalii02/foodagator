const { Router } = require("express");
const multer = require("multer");

const fileController = require("../controllers/file.controller");
const cartController = require("../controllers/cart.controller");
const productController = require("../controllers/product.controller");
const userController = require("../controllers/user.controller");
const firebaseController = require("../controllers/firebase.controller");
const referralController = require("../controllers/referral.controller");
const postController = require("../controllers/post.controller");

const {
  cartValidator,
  idValidator,
  addOrRemoveValidator,
} = require("../validator/cart.validator");
const { productValidator } = require("../validator/product.validator");
const { userValidator } = require("../validator/user.validator");
const { firebaseValidator } = require("../validator/firebase.validator");
const { queryValidator } = require("../validator/query.validator");
const { referralValidator } = require("../validator/referral.validator");
const {
  postValidator,
  commentValidator,
} = require("../validator/post.validator");

const { sessionChecker } = require("../middleware/checkSession");

const FILE_SIZE = 5242880;
const FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const DEFAULT_PATH_FOR_UPLOADING = "./";

const storage = multer.diskStorage({
  destination: DEFAULT_PATH_FOR_UPLOADING,
  fileSize: FILE_SIZE,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== FILE_TYPE) {
      return cb(new Error("Wrong file type"));
    }
    cb(null, true);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerValidationMiddleware = multer({ storage: storage }).single("file");

const router = Router();

//-----------------------------------FILE----------------------------------------\\

router.get("/file", fileController.getFile);
router.post(
  "/updateFile",
  multerValidationMiddleware,
  fileController.uploadFile
);

//-----------------------------------CART----------------------------------------\\

router.put(
  "/updateCart",
  idValidator,
  cartValidator,
  sessionChecker,
  cartController.updateCart
);
router.get("/getCartById", idValidator, cartController.getCartById);
router.delete(
  "/deleteCart",
  idValidator,
  sessionChecker,
  cartController.deleteCart
);

router.post(
  "/buyProduct",
  addOrRemoveValidator,
  sessionChecker,
  cartController.addToCart
);
router.post(
  "/removeProductInCart",
  addOrRemoveValidator,
  sessionChecker,
  cartController.deleteProductFromCart
);

//----------------------------------PRODUCT---------------------------------------\\

router.post(
  "/createProduct",
  productValidator,
  productController.createProduct
);
router.put(
  "/updateProduct",
  queryValidator,
  productValidator,
  productController.updateProduct
);
router.get(
  "/products",
  idValidator,
  queryValidator,
  productController.getProductListWithFilters
);
router.delete("/deleteProduct", idValidator, productController.deleteProduct);

//-----------------------------------USER----------------------------------------\\

router.post("/register", userValidator, userController.register);
router.post("/login", userValidator, userController.login);

//-----------------------------------FIREBASE-------------------------------------\\

router.post(
  "/uploadPhotoProduct",
  firebaseValidator,
  firebaseController.uploadImageInProduct
);

//-----------------------------------REFERRAL-------------------------------------\\

router.get("/referralClick", referralController.isActivatedReferralCode);
router.post(
  "/sendReferralLink",
  referralValidator,
  sessionChecker,
  referralController.sendReferralCodeToEmail
);

router.get("/badge", sessionChecker, referralController.getMyBadge);

//-----------------------------------POST-------------------------------------\\

router.get("/getMyPosts", sessionChecker, postController.getFeed);
router.post(
  "/createPost",
  postValidator,
  sessionChecker,
  postController.createPost
);
router.post(
  "/createComment",
  commentValidator,
  queryValidator,
  sessionChecker,
  postController.createComment
);
router.post(
  "/changeLike",
  queryValidator,
  sessionChecker,
  postController.changeLike
);
router.get(
  "/getAllComment",
  queryValidator,
  sessionChecker,
  postController.getAllComments
);

router.get(
  "/getSystemComment",
  queryValidator,
  sessionChecker,
  postController.getSystemComments
);

module.exports = router;
