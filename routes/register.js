var express = require("express");
var router = express.Router();
const RegisterController = require("../controllers/registerLogin.controllers");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

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
  folder: "userAvatars",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

router.get("/", RegisterController.getRegisterPage);
// router.post("/", RegisterController.register);

router.post("/", parser.single("avatar"), RegisterController.register);

module.exports = router;
