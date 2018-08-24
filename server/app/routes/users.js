import express from 'express';

import {
  createUser,
  allUsers,
  login,
} from './../controller/users';

const userRoutes = express.Router();

/** Registers a User
 *  @callback
*/
userRoutes.post('/auth/signup', (req, res) => {
  createUser(req.body.email, req.body.password)
    .then((user) => {
      res.send({
        results: user,
      });
    }).catch(() => res.status(400).send({ error: 'input a email and password' }));
});

/** gets all users
 *  @callback
 */
userRoutes.get('/auth/signup', (req, res) => {
  allUsers().then((questions) => {
    res.send({
      results: questions,
    });
  }).catch(() => res.status(400).send({ error: 'An Error Occured' }));
});

/** login a user
 *  @callback
 */
userRoutes.post('/auth/login', (req, res) => {
  login(req.body.email, req.body.password).then((token) => {
    res.status(200).send({ auth: true, token });
  }).catch(() => res.status(401).send({ auth: false, token: null }));
});


// userRoutes.get('/me', (req, res) => {
//   const token = req.headers[''];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//     res.status(200).send(decoded);
//   });
// });

module.exports = userRoutes;
