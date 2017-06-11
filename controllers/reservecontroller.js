/**
 * Created by caiomcg on 11/06/17.
 */

'use strict';

const db = require("../db");
const _  = require("underscore");
const error = require("./errorcontroller");

exports.index = function (req, res, next) {
    db.reserve.findAll().then(function (reserves) { //Querys
        if (!!reserves && reserves.length > 0) {
            res.json(reserves);
        } else {
            return error("Could not find reports", 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.add = function (req, res, next) {
    const body = _.pick(req.body, "start", "finish", "user", "room_id");
    console.log(body);
    db.reserve.create(body).then(function (room) {
        if (!!room) {
            res.json(room.toJSON());
        } else {
            return error("Could not create the report", 400, next);
        }
    }, function () {
        return error("Could not create the report", 400, next);
    });
};


exports.find = function(req, res, next) {
    db.reserve.findById(req.params.id).then(function (room) {
        if (!!room) {
            res.json(room.toJSON());
        } else {
            return error("Could not find reserve with ID " + req.params.id, 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.update = function (req, res, next) {
    const body = _.pick(req.body, "start", "finish", "user", "room_id");

    db.reserve.find({where: {id: req.params.id}}).then(function (room) {
        if (!!room) {
            room.updateAttributes(body).then(function () {
                if (!Object.keys(body).length) {
                    return error("Could not update with the desired information", 400,  next);
                } else {
                    res.json(body);
                }
            }).catch(function (err) {
                return error("Could not update reserve with ID " + req.params.id, 404, next);
            })
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.remove = function (req, res, next) {
    db.reserve.destroy({where: {id: req.params.id}}).then(function (rows) {
        if (rows === 0) {
            return error("Could not destroy reserve with ID " + req.params.id, 404, next);
        } else {
            return res.status(200).json({delete: "ok"});
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};