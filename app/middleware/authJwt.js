const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");
const admin = require("../config/firebase.config");
const db = require("../models");
const Game = db.game;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isCreator = (req, res, next) => {
  Game.findByPk(req.params.id).then((game) => {
    if (game.userId !== req.userId) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    next();
  });
};

isValidUID = (req, res, next) => {
  admin
    .auth()
    .getUser(req.body.uid)
    .then((userRecord) => {
      next();
    })
    .catch((error) => {
      res
        .status(403)
        .send({
          message: "User does not exist or see error for more details",
          error: error,
        });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isCreator: isCreator,
  isValidUID: isValidUID,
};

module.exports = authJwt;
