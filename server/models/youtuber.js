const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Youtuber = sequelize.define('youtuber', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING
  },
  channelUrl: {
    type: DataTypes.STRING
  }
}, {
  tableName: "youtuber",
  paranoid: true,
  timeStamps: true
});

sequelize.sync();

module.exports = Youtuber;
