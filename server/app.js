
import express from 'express';

import bodyParser from 'body-parser';

// const express = require('express');
// const bodyParser = require('body-parser');


const routes = require('./app/routes/question');

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', routes);


app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = app;
