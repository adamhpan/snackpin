const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Youtuber = require("./youtuber")
const Snack = require("./snack")

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
    type: DataTypes.STRING,
    get() {
      return `http://i.ytimg.com/vi/${this.getDataValue("thumbnail")}/maxresdefault.jpg`
    }
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  tableName: "reaction",
  paranoid: true,
  timeStamps: true
});

Reaction.belongsTo(Youtuber)
Reaction.belongsTo(Snack)

module.exports = Reaction;
