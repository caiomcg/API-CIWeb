/**
 * Created by caiomcg on 06/06/17.
 */
var express = require("express");
var route   = express.Router();

var roomController = require("../controllers/roomcontroller");

route.get("/", roomController.index);
route.post("/", roomController.add);
route.get("/:id", roomController.find);
route.put("/:id", roomController.update);
route.delete("/:id", roomController.remove);

module.exports = route;