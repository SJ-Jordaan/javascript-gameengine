const db = require("../models");
const Game = db.game;
const User = db.user;

// Create and Save a new Game
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Missing game name",
    });
    return;
  }

  if (!req.body.id) {
    res.status(400).send({
      message: "Missing creator id",
    });
  }

  if (!User.findByPk(req.body.id)) {
    res.status(404).send({
      message: "Creator does not exist",
    });
  }

  const game = {
    name: req.body.name,
    description: req.body.description,
    userId: req.body.id,
  };

  Game.create(game)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Failed to create game",
      });
    });
};

// Retrieve all Games from the database.
exports.findAll = (req, res) => {
  return Game.findAll({
    include: [{ model: User, attributes: ["username"], as: "creator" }],
  })
    .then((games) => {
      return res.send(games);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Failed to find games",
      });
    });
};

// Find a single Game with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Game.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Failed to find game ${id}`,
      });
    });
};

// Update a Game by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Game.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      res.send({
        message: "Game was updated successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Tutorial with ${id}`,
      });
    });
};

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Game.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: `Game was deleted successfully` });
      } else {
        res.send({
          message: `Cannot delete Game ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Game ${id}`,
      });
    });
};
