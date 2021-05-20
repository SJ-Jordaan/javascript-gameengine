const db = require("../models");
const User = db.user;
const Game = db.game;

exports.allAccess = (req, res) => {
  // All public content gets server here
  res.status(200).send("Public content");
};

exports.getUserGames = (req, res) => {
  const id = req.body.id;

  User.findByPk(id, { include: ["games"] })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not find user",
      });
    });
};
