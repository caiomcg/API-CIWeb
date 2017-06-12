/**
 * Created by caiomcg on 06/06/17.
 */

'use strict';

const db = require("../db");
const _  = require("underscore");
const error = require("./errorcontroller");

exports.index = function (req, res, next) {
    db.room.findAll().then(function (rooms) {
        if (!!rooms && rooms.length > 0) {
            res.json(rooms);
        } else {
            return error("Could not find rooms", 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.add = function (req, res, next) {
    const body = _.pick(req.body, "id", "projector", "seats", "board", "conditioner");

    db.room.create(body).then(function (room) {
        if (!!room) {
            res.json(room.toJSON());
        } else {
            return error("Could not create the room", 400, next);
        }
    }, function () {
        return error("Could not create the room", 400, next);
    });
};


exports.find = function(req, res, next) {
    db.room.findById(req.params.id, {
        include: db.reserve
    }).then(function (room) {
        if (!!room) {
            res.json(room.toJSON());
        } else {
            return error("Could not find room with ID " + req.params.id, 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.update = function (req, res, next) {
    const body = _.pick(req.body, "projector", "seats", "board", "conditioner");

    db.room.find({where: {id: req.params.id}}).then(function (room) {
        if (!!room) {
            room.updateAttributes(body).then(function () {
                if (!Object.keys(body).length) {
                    return error("Could not update with the desired information", 400,  next);
                } else {
                    res.json(body);
                }
            }).catch(function (err) {
                return error("Could not update room with ID " + req.params.id, 404, next);
            })
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.remove = function (req, res, next) {
    db.room.destroy({where: {id: req.params.id}}).then(function (rows) {
        if (rows === 0) {
            return error("Could not destroy room with ID " + req.params.id, 404, next);
        } else {
            return res.status(200).json({delete: "ok"});
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};