const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dev', 'admin', 'CuAn9181CAmGPoBIiElL', {
  host: 'dev.cf4edq6j7ygq.us-east-1.rds.amazonaws.com',
  dialect: 'mysql'
});

export default sequelize;
