import validator from 'email-validator';
import {
  createUser,
  allUsers,
  login,
} from './../controller/users';

const validate = (email, res) => {
  if (!validator.validate(email)) {
    return res.send('please input a valid email');
  }
};
const newUsers = (req, res) => {
  validate(req.body.email, res);
  createUser(req.body.email, req.body.password)
    .then((user) => {
      res.send({
        status: 'success',
        message: 'user was created succcessfully',
        data: user,
      });
    }).catch(() => res.status(400).send({ error: 'input a email and password' }));
};

const getAllUsers = (req, res) => {
  allUsers().then((questions) => {
    res.send({
      status: 'success',
      message: 'users were fetched succcessfully',
      data: questions,
    });
  }).catch(() => res.status(400).send({ error: 'An Error Occured' }));
};

const logInUser = (req, res) => {
  validate(req.body.email, res);
  login(req.body.email, req.body.password).then((token) => {
    res.status(200).send({ auth: true, token });
  }).catch(() => res.status(400).send({ auth: false, token: null }));
};

export {
  newUsers,
  logInUser,
  getAllUsers,
};
