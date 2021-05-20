const { verifySignup, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
const router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [authJwt.isValidUID, verifySignup.checkDuplicateUsername],
    controller.signup
  );

  router.post("/signin", [authJwt.isValidUID], controller.signin);

  app.use("/api/auth", router);
};
