const appRoot = require('app-root-path');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');


// Create express app instance:
const app = express();

// Configure general app settings and functionality:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(express.static(`${appRoot}/app/public`));
// app.use(express.static(`${appRoot}/app/public/dist`));


// Run the app:
app.listen(config.port);

if (config.environment === 'local') {
  console.log(`App running at: localhost:${config.port}`);
}


// Export the app:

module.exports = app;
