import db from '../db/dbconnect';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./.././../config.js');

/**  create a User
 *  @function
*/
const createUser = (email, password) => {
  if (!email || !password) return Promise.reject(new Error('post a question'));
  const hashedPassword = bcrypt.hashSync(password, 8);
  return db.one('INSERT INTO users (email, password) VALUES($1,$2) RETURNING id', [email, hashedPassword])
    .then((data) => {
      const token = jwt.sign({ id: data.id }, config.secret, {
        expiresIn: 86400,
      });
      return Promise.resolve({ token });
    });
};

/**  Get all Users
 *  @function
*/
const allUsers = () => {
  return db.any('select * from users')
    .then((data) => {
      return Promise.resolve(data);
    });
};


/**  login a User
 *  @function
*/
const login = (email, password) => {
  console.log(email);
  return db.one('SELECT * FROM users WHERE email =$1', email)
    .then((data) => {
      const passwordIsValid = bcrypt.compareSync(password, data.password);
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });
      if (!passwordIsValid) {
        return Promise.reject(Error);
      }
      return Promise.resolve(token);
    }).catch(e => Promise.reject(e));
};

export {
  createUser,
  allUsers,
  config,
  bcrypt,
  jwt,
  login,
};
