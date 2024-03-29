const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Snack = require("./snack")

const SnackUser = sequelize.define('snackUser', {
  snackId: {
    field: "snack_id",
    type: DataTypes.INTEGER,
  },
  userId: {
    field: "user_id",
    type: DataTypes.INTEGER
  }
}, {
  tableName: "snack_user",
  paranoid: true,
  timeStamps: true
});

SnackUser.belongsTo(Snack);

module.exports = SnackUser;
