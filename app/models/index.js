const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");
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
db.user = require("./user.model")(sequelize, Sequelize);
db.game = require("./game.model")(sequelize, Sequelize);

db.user.hasMany(db.game);
db.game.belongsTo(db.user);

module.exports = db;
