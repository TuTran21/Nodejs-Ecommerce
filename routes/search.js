var express = require("express");
var router = express.Router();
const SearchController = require("../controllers/search.controller");

/* GET search page. */
router.get("/search", SearchController.getSearchPage);

module.exports = router;
