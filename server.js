const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// Configure to allow UI to call api
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://game-engine-ui.herokuapp.com'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// set the home page route
app.get('/', (req, res) => {
  // ejs render automatically looks in the views folder
  res.send('API is online');
});

app.listen(port, () => {
  console.log('Our app is running on http://localhost:' + port);
});
