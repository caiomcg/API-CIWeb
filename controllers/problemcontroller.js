/**
 * Created by caiomcg on 24/05/2017.
 */

var firebase = require("firebase");
var bodyparser = require("body-parser");

exports.index = function (req, res, next) {
    var db = firebase.database();
    console.log("Fetching index");
    console.log("ok");
    var ref = db.ref("problems").once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            return res.json(snapshot.val());
        }
        res.status(404).send();
    }).catch(function(err){
        return res.status(500);
    });
};

exports.find = function(req, res, next) {
    var db = firebase.database();
    var ref = db.ref("problems").child(req.params.name).once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            return res.json(snapshot.val());
        }
        res.status(404).send();
    }).catch(function (err) {
        return res.status(500);
    });
};

exports.add = function (req, res, next) {

};