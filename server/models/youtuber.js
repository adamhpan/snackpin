const { DataTypes } = require('sequelize');
const { sequelize } = require("~/server/config/sequelize");

const Youtuber = sequelize.define('youtuber', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING
  },
  channelUrl: {
    type: DataTypes.STRING
  }
}, {
  paranoid: true,
  timeStamps: true
});

export default Youtuber;
