var express = require("express");
var router = express.Router();
const AdminController = require("../controllers/admin.controllers");

/* GET home page. */
router.get("/", AdminController.getAdminPage);
router.get("/users", AdminController.getAdminUsersPage);
router.get("/products", AdminController.getAdminProductsPage);

router.get("/products/:id", AdminController.getProductDetails);

router.get("/users/:id", AdminController.getUserDetails);
module.exports = router;
