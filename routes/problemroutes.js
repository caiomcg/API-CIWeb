/**
 * Created by caiomcg on 24/05/2017.
 */
var express = require("express");
var route   = express.Router();

var problemController = require("../controllers/problemcontroller");

route.get("/", problemController.index);
route.get("/:id", problemController.find);

module.exports = route;