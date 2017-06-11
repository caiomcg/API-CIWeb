/**
 * Created by caiomcg on 03/06/17.
 */

var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false
});

const report = sequelize.import(__dirname + "/models/report.js");
const room = sequelize.import(__dirname + "/models/room.js");
const reserve = sequelize.import(__dirname + "/models/reserve.js");

reserve.belongsTo(room, {
    foreignKey: "room_id"
});

room.hasMany(reserve);

module.exports = db = {
    report: report,
    room: room,
    reserve: reserve,
    sequelize: sequelize,
    Sequelize: Sequelize
};