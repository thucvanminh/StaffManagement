require('dotenv').config();
const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize(
          process.env.DB_NAME || 'staffmanagement',
          process.env.DB_USER || 'root',
          process.env.DB_PASSWORD,
          {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false,
          }
      );
      Database.instance = this;
    }
    return Database.instance;
  }
}

module.exports = new Database().sequelize;
