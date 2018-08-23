import express from 'express';

import {
  createUser,
  allUsers,
} from './../controller/users';

const userRoutes = express.Router();

// Create a user
userRoutes.post('/auth/signup', (req, res) => {
  createUser(req.body.email, req.body.password)
    .then((user) => {
      res.send({
        results: user,
      });
    }).catch(() => res.status(400).send({ error: 'input a email and password' }));
});

//  Get all Users
userRoutes.get('/auth/signup', (req, res) => {
  allUsers().then((questions) => {
    res.send({
      results: questions,
    });
  }).catch(() => res.status(400).send({ error: 'An Error Occured' }));
});

module.exports = userRoutes;
