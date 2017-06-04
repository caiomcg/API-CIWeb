/**
 * Created by caiomcg on 03/06/17.
 */

var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql"
});

module.exports = db = {
    report: sequelize.import(__dirname + "/models/report.js"),
    sequelize: sequelize,
    Sequelize: Sequelize
};