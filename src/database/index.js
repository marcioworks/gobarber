const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const User = require('../app/models/User');
const File = require('../app/models/File');
const Appointment = require('../app/models/Appointment');

const databaseConfig = require('../config/database');

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = new Database();
