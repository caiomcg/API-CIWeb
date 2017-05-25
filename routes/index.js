/**
* Created by caiomcg on 24/05/2017.
*/
var express = require('express');
var router = express.Router();

var indexController = require("../controllers/extra");
// GET Home
router.get('/', indexController.index);

module.exports = router;