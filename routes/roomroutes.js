/**
 * Created by caiomcg on 06/06/17.
 */
var express = require("express");
var route   = express.Router();

var roomController = require("../controllers/roomcontroller");

route.get("/", roomController.index);
route.post("/", roomController.add);

module.exports = route;