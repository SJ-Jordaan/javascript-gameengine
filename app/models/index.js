const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const config = dbConfig[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(config.url, config);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    return;
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// TODO: Add sequalise models here
db.games = require("./game.model.js")(sequelize, Sequelize);

module.exports = db;
