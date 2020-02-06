const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const User = sequelize.define('user', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  tableName: "user",
  paranoid: true,
  timeStamps: true
});

sequelize.sync()

module.exports = User;
