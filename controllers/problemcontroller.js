/**
 * Created by caiomcg on 24/05/2017.
 */

var db = require("../db");
var _  = require("underscore");

exports.index = function (req, res, next) {
    db.report.findAll().then(function (reports) {
        if (!!reports) {
            res.json(reports);
        } else {
            res.status(404).send();
        }
    }, function (err) {
        res.status(500).send();
    }).catch(function (err) {
        res.status(500).send();
    });
};

exports.find = function(req, res, next) {
    db.report.findById(req.params.id).then(function (report) {
        if (!!report) {
            console.log("here3");
            res.json(report.toJSON());
        } else {
            res.status(404).send();
        }
    }, function (err) {
        res.status(500).send();
    }).catch(function (err) {
        res.status(500).send();
    });
};

exports.add = function (req, res, next) {
    const body = _.pick(req.body, "name", "email", "title", "message", "state");

    db.report.create(body).then(function (report) {
       res.json(report.toJSON());
    }, function (err) {
        res.status(500).send();
    });
};