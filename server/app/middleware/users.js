import {
  createUser,
  allUsers,
  login,
} from './../controller/users';

const newUsers = (req, res) => {
  createUser(req.body.email, req.body.password)
    .then((user) => {
      res.send({
        results: user,
      });
    }).catch(() => res.status(400).send({ error: 'input a email and password' }));
};

const getAllUsers = (req, res) => {
  allUsers().then((questions) => {
    res.send({
      results: questions,
    });
  }).catch(() => res.status(400).send({ error: 'An Error Occured' }));
};
const logInUser = (req, res) => {
  login(req.body.email, req.body.password).then((token) => {
    res.status(200).send({ auth: true, token });
  }).catch(() => res.status(401).send({ auth: false, token: null }));
};

export {
  newUsers,
  logInUser,
  getAllUsers,
};
