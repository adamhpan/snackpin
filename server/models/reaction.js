const { DataTypes } = require('sequelize');
const { sequelize } = require("~/server/config/sequelize");

const { Youtuber } = require("./youtuber")
const { Snack } = require("./snack")

const Reaction = sequelize.define('reaction', {
  // Model attributes are defined here
  youtuberId: {
    field: "youtuber_id",
    type: DataTypes.INTEGER
  },
  snackId: {
    field: "snack_id",
    type: DataTypes.INTEGER
  },
  thumbnail: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  paranoid: true,
  timeStamps: true
});

Reaction.belongsTo(Youtuber)
Reaction.belongsTo(Snack)

export default Reaction;
