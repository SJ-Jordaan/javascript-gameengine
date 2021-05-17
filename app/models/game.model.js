const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("game", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Game;
};
