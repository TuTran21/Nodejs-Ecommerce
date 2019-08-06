var express = require("express");
var router = express.Router();
const SearchController = require("../controllers/search.controllers");

/* GET search page. */
router.get("/search", SearchController.getSearchPage);

module.exports = router;
