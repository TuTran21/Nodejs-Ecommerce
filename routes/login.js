var express = require("express");
var router = express.Router();
const LoginController = require("../controllers/registerLogin.controllers");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", LoginController.getLoginPage);
router.post("/", LoginController.login);
module.exports = router;
