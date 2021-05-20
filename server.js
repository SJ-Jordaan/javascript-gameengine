const express = require("express");
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

// Configure to allow UI to call api
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Setup the models from DB
const db = require("./app/models");
db.sequelize.sync();

// set the home page route
app.get("/", (req, res) => {
	// ejs render automatically looks in the views folder
	res.send("API is online");
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/game.routes.js")(app);

app.listen(port, () => {
	console.log("Our app is running on http://localhost:" + port);
});
