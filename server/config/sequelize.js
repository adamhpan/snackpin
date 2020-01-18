const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('snackpin', 'admin', '7CgItURIJ2f0DwXqEHNF', {
  host: 'database-1.cf4edq6j7ygq.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

module.exports = sequelize;
