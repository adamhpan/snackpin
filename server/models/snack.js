const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Snack = sequelize.define('snack', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street1: {
    field: "street_1",
    type: DataTypes.STRING
  },
  street2: {
    field: "street_2",
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  zipCode: {
    field: "zip_code",
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8)
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 8)
  }
}, {
  tableName: "snack",
  paranoid: true,
  timeStamps: true
});

sequelize.sync();

module.exports = Snack;
