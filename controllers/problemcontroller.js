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

exports.find = function(req, res, next) {
    db.report.findById(req.params.id).then(function (report) {
        if (!!report) {
            res.json(report.toJSON());
        } else {
            res.status(404).send();
        }
    }, function (err) {
        res.status(500).send();
    });
};

exports.update = function (req, res, next) {
    const body = _.pick(req.body, "name", "email", "title", "message", "state");

    db.report.find({where: {id: req.params.id}}).then(function (report) {
        if (!!report) {
            report.updateAttributes(body).then(function () {
                res.json(body);
            }).catch(function (err) {
                console.log(err);
                res.status(404).send();
            })
        }
    });
};

exports.remove = function (req, res, next) {
    db.report.destroy({where: {id: req.params.id}}).then(function (rows) {
        if (rows === 0) {
            res.sendStatus(404).json({error: "ID not found"});
        } else {
            res.sendStatus(204);
        }
    }, function (err) {
        res.status(500).send();
    });
};