/**
 * Created by caiomcg on 03/06/17.
 */

var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false
});

module.exports = db = {
    report: sequelize.import(__dirname + "/models/report.js"),
    room: sequelize.import(__dirname + "/models/room.js"),
    sequelize: sequelize,
    Sequelize: Sequelize
};