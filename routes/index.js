var express = require("express");
var router = express.Router();
const IndexController = require("../controllers/index.controllers");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", IndexController.getIndexPage);
module.exports = router;
