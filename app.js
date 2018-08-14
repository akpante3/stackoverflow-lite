const express = require('express');
const bodyParser = require('body-parser');
require('babel-core/register');

const routes = require('./app/routes/question');
const apiVersion = require('./app/routes/question');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/v1', apiVersion);


app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = { app };
