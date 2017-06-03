/**
 * Created by caiomcg on 24/05/2017.
 */

var mysqlhandler = require("../database/mysqlhandler");

exports.index = function (req, res, next) {
    mysqlhandler.connect(function (err, connection) {
        if (err) {
            console.log("Failed to connect");
            return res.status(500);
        }

        connection.query("SELECT * FROM report",function(err,rows){
            connection.release();
            if(!err) {
                return res.json(rows);
            }
            return res.status(500);
        });
    });
};

exports.find = function(req, res, next) {
    mysqlhandler.connect(function (err, connection) {
        if (err) {
            console.log("Failed to connect");
            return res.status(500);
        }

        connection.query("SELECT * FROM report WHERE id = " + req.params.id,function(err,rows){
            connection.release();
            if (!err) {
                if (!rows.length) {
                    return res.status(404).json({error: "Found none with id: " + req.params.id});
                }
                return res.json(rows);
            }
            return res.status(404).json({error: "Found none with id: " + req.params.id});
        });
    });
};

exports.add = function (req, res, next) {
    return res.json({
        teste: 3
    });

};