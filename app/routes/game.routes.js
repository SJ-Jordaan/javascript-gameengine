const { authJwt } = require("../middleware");
const games = require("../controllers/game.controller");
const router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
  
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  router.post("/", [authJwt.verifyToken], games.create);
  router.get("/", games.findAll);
  router.get("/:id", games.findOne);
  router.put("/:id", [authJwt.verifyToken, authJwt.isCreator], games.update);
  router.delete("/:id", [authJwt.verifyToken, authJwt.isCreator], games.delete);

  app.use("/api/games", router);
};
