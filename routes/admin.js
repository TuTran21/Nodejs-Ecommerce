var express = require("express");
var router = express.Router();
const AdminController = require("../controllers/admin.controllers");
const ProductCreateController = require("../controllers/productCreate.controllers");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "doyyjeich",
  api_key: "862973555617767",
  api_secret: "3tT6kKWJHIJSdrE8BkIXkyl9Hb0"
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "productImgs",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });
/* GET home page. */
router.get("/", AdminController.getAdminPage);
router.get("/users", AdminController.getAdminUsersPage);
router.get("/products", AdminController.getAdminProductsPage);

router.get("/products/create", ProductCreateController.getProductCreatePage);
router.post(
  "/products/create",
  parser.any(),
  ProductCreateController.productCreate
);

router.get("/products/:id", AdminController.getProductDetails);
router.post(
  "/products/:id",
  parser.any(),
  AdminController.updateProductDetails
);

router.get("/users/:id", AdminController.getUserDetails);
module.exports = router;
