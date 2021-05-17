module.exports = (app) => {
  const { authJwt } = require("../middleware");
  const games = require("../controllers/game.controller.js");
  let router = require("express").Router();

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  router.post("/", [authJwt.verifyToken], games.create);
  router.get("/", [authJwt.verifyToken], games.findAll);
  router.get("/:id", [authJwt.verifyToken], games.findOne);
  router.put("/:id", [authJwt.verifyToken, authJwt.isCreator], games.update);
  router.delete("/:id", [authJwt.verifyToken, authJwt.isCreator], games.delete);

  app.use("/api/games", router);
};
