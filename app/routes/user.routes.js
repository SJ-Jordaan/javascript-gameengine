const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  router.get("/", user.allAccess);
  router.get("/games", [authJwt.verifyToken], user.getUserGames);

  app.use("/api/user", router);
};
