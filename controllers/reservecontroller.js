/**
 * Created by caiomcg on 11/06/17.
 */

'use strict';

const db = require("../db");
const _  = require("underscore");
const error = require("./errorcontroller");

exports.index = function (req, res, next) {
    const where = {};

    if (req.query.room !== undefined) {
        where.where = {room_id: req.query.room};
    }

    db.reserve.findAll(where).then(function (reserves) { //Querys
        if (!!reserves && reserves.length > 0) {
            res.json(reserves);
        } else {
            return error("Could not find reserves", 404, next);
        }
    }, function (err) {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.add = function (req, res, next) {
    const body = _.pick(req.body, "start", "finish", "user", "room_id", "always");


    db.reserve.findAll({where: {room_id: body.room_id}}).then((reserves) => {
        if (!!reserves) {
            for (var i = 0; i < reserves.length; i++) {
                console.log("Iterating");
                const start  = new Date(reserves[i].start);
                const finish = new Date(reserves[i].finish);

                const newStart = new Date(body.start);
                const newFinish = new Date(body.finish);

                if (start.getTime() === newStart.getTime() || finish.getTime() === newFinish.getTime() || finish.getTime() === newStart.getTime() || start.getTime() === newFinish.getTime()) {
                    return error("Room already reserved", 400, next);
                }
                if ((newStart > start && newStart < finish) || (newFinish > start && newFinish < finish)) {
                    return error("Room already reserved", 400, next);
                }
            }

            db.reserve.create(body).then(function (room) {
                if (!!room) {
                    res.json(room.toJSON());
                } else {
                    return error("Could not create the reserve", 400, next);
                }
            }, function () {
                return error("Could not create the reserve", 400, next);
            });
        }
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
    const body = _.pick(req.body, "start", "finish", "user", "always");

    db.reserve.find({where: {id: req.params.id}}).then(function (room) {
        if (!!room) {
            db.reserve.findAll({where: {room_id: room.room_id}}).then((reserves) => {
                if (!!reserves) {
                    for (var i = 0; i < reserves.length; i++) {
                        const start = new Date(reserves[i].start);
                        const finish = new Date(reserves[i].finish);

                        const newStart = new Date(body.start);
                        const newFinish = new Date(body.finish);

                        if (start.getTime() === newStart.getTime() || finish.getTime() === newFinish.getTime() || finish.getTime() === newStart.getTime() || start.getTime() === newFinish.getTime()) {
                            return error("Another event starts or finishes at the same time", 400, next);
                        }
                        if ((newStart > start && newStart < finish) || (newFinish > start && newFinish < finish)) {
                            return error("Cannot create a reserve between another", 400, next);
                        }
                    }

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
            });
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