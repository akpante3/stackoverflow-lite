
import express from 'express';

import bodyParser from 'body-parser';

// const express = require('express');
// const bodyParser = require('body-parser');
import userRoutes from './app/routes/users';
import questionRoutes from './app/routes/question';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', questionRoutes);
app.use('/v1', userRoutes);


app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = app;
