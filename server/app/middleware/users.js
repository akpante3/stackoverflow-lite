import validator from 'email-validator';
import {
  createUser,
  allUsers,
  login,
} from './../controller/users';

const newUsers = (req, res) => {
  if (!validator.validate(req.body.email)) {
    return res.status(400).send('please input a valid email');
  }
  createUser(req.body.email, req.body.password, req.body.username)
    .then((token) => {
      res.send({
        status: 'success',
        message: 'user was created succcessfully',
        token,
      });
    }).catch(() => {
      res.status(400).send({    
        auth: false,
        token: null,
        message: 'input valid email and password and username',
      });
    });
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
  if (!validator.validate(req.body.email)) {
    return res.status(400).send('please input a valid email');
  }
  login(req.body.email, req.body.password).then((token) => {
    res.status(200).send({
      auth: true,
      token,
      status: 'success',
      message: 'login was succcessfully',
    });
  }).catch(() => res.status(400).send({
    auth: false,
    token: null,
    message: 'invalid user',
  }));
};

export {
  newUsers,
  logInUser,
  getAllUsers,
};
