const Sequelize = require('sequelize')

const ev = process.env;

const sequelize = new Sequelize(ev.DBNAME, ev.DBUSER, ev.DBPASS, {
  host: ev.DBHOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports.sequelize = sequelize;
