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
            return error.notFound("Could not find reports", next);
        }
    }, function (err) {
        return error.internalError("An error occurred while fetching from the database", next);
    });
};

exports.add = function (req, res, next) {
    const body = _.pick(req.body, "name", "email", "title", "message", "state");

    db.report.create(body).then(function (report) {
        if (!!report) {
            res.json(report.toJSON());
        } else {
            return error.internalError("Could not create the report", next);
        }
    }, function (err) {
        return error.internalError("An error occurred while fetching from the database", next);
    });
};

exports.find = function(req, res, next) {
    db.report.findById(req.params.id).then(function (report) {
        if (!!report) {
            res.json(report.toJSON());
        } else {
            return error.notFound("Could not find report with ID " + req.params.id, next);
        }
    }, function (err) {
        return error.internalError("An error occurred while fetching from the database", next);
    });
};

exports.update = function (req, res, next) {
    const body = _.pick(req.body, "name", "email", "title", "message", "state");

    db.report.find({where: {id: req.params.id}}).then(function (report) {
        if (!!report) {
            report.updateAttributes(body).then(function () {
                res.json(body);
            }).catch(function (err) {
                return error.notFound("Could not update report with ID " + req.params.id, next);
            })
        }
    }, function (err) {
        return error.internalError("An error occurred while fetching from the database", next);
    });
};

exports.remove = function (req, res, next) {
    db.report.destroy({where: {id: req.params.id}}).then(function (rows) {
        if (rows === 0) {
            return error.notFound("Could not destroy report with ID " + req.params.id, next);
        } else {
            res.sendStatus(204);
        }
    }, function (err) {
        return error.internalError("An error occurred while fetching from the database", next);
    });
};