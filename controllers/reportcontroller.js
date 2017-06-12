/**
 * Created by caiomcg on 24/05/2017.
 */

'use strict';

const db = require("../db");
const _  = require("underscore");
const error = require("./errorcontroller");

exports.index = function (req, res, next) {
    db.report.findAll().then(function (reports) { //Querys
        if (!!reports && reports.length > 0) {
            res.json(reports);
        } else {
            return error("Could not find reports", 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.add = function (req, res, next) {
    const body = _.pick(req.body, "name", "email", "title", "message", "state");

    db.report.create(body).then(function (report) {
        if (!!report) {
            res.json(report.toJSON());
        } else {
            return error("Could not create the report", 400, next);
        }
    }, function (err) {
        return error("Could not create the report", 400, next);
    });
};

exports.find = function(req, res, next) {
    db.report.findById(req.params.id).then(function (report) {
        if (!!report) {
            res.json(report.toJSON());
        } else {
            return error("Could not find report with ID " + req.params.id, 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.update = function (req, res, next) {
    const body = _.pick(req.body, "name", "email", "title", "message", "state");

    db.report.find({where: {id: req.params.id}}).then(function (report) {
        if (!!report) {
            report.updateAttributes(body).then(function () {
                if (!Object.keys(body).length) {
                    return error("Could not update with the desired information", 400,  next);
                } else {
                    res.json(body);
                }
            }).catch(function (err) {
                return error("Could not update report with ID " + req.params.id, 404, next);
            })
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.remove = function (req, res, next) {
    db.report.destroy({where: {id: req.params.id}}).then(function (rows) {
        if (rows === 0) {
            return error("Could not destroy report with ID " + req.params.id, 404, next);
        } else {
            return res.status(200).json({delete: "ok"});
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};