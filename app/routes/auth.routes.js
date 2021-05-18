module.exports = (app) => {
  const { verifySignUp } = require("../middleware");
  const controller = require("../controllers/auth.controller");
  let router = require("express").Router();

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [verifySignUp.checkDuplicateUsername],
    controller.signup
  );

  router.post("/signin", controller.signin);

  app.use("/api/auth", router);
};
