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
db.user = require("./user.model.js")(sequelize, Sequelize);
db.game = require("./game.model.js")(sequelize, Sequelize);

db.user.hasMany(db.game, { as: "games" });
db.game.belongsTo(db.user, {
  foreignKey: "id",
  as: "creator",
});

module.exports = db;
