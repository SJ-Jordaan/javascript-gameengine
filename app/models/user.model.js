const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return User;
};
