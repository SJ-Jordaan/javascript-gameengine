const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the home page route
app.get('/', (req, res) => {
  // ejs render automatically looks in the views folder
  res.send('API is online');
});

app.listen(port, () => {
  console.log('Our app is running on http://localhost:' + port);
});
