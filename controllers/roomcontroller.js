/**
 * Created by caiomcg on 06/06/17.
 */

'use strict';

const db = require("../db");
const _  = require("underscore");
const error = require("./errorcontroller");

exports.index = function (req, res, next) {
    console.log("index");

    db.room.findAll().then(function (rooms) { //Querys && check if already with id
        if (!!rooms && rooms.length > 0) {
            res.json(rooms);
        } else {
            return error("Could not find reports", 404, next);
        }
    }, function () {
        return error("An error occurred while fetching from the database", 500, next);
    });
};

exports.add = function (req, res, next) {
    console.log("add");

    const body = _.pick(req.body, "id", "projector", "seats", "board", "conditioner");

    db.room.create(body).then(function (room) {
        if (!!room) {
            res.json(room.toJSON());
        } else {
            return error("Could not create the report", 400, next);
        }
    }, function () {
        return error("Could not create the report", 400, next);
    });
};