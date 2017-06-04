/**
 * Created by caiomcg on 24/05/2017.
 */
var express = require("express");
var route   = express.Router();

var problemController = require("../controllers/reportcontroller");

route.get("/", problemController.index);
route.post("/", problemController.add);
route.get("/:id", problemController.find);
route.put("/:id", problemController.update);
route.delete("/:id", problemController.remove);


module.exports = route;