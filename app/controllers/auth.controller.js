require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    uid: req.body.uid,
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `User could not be signed up: ${err.message}` });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      uid: req.body.uid,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
