/**
 * Created by caiomcg on 06/06/17.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("room", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [1, 40]
            }
        },
        projector: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        board: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        conditioner: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });
};