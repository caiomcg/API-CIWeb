/**
 * Created by caiomcg on 07/06/17.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("reserve", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        start: {
            type: DataTypes.STRING,
            allowNull: false
        },
        finish: {
            type: DataTypes.STRING,
            allowNull: false
        },
        always: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });
};