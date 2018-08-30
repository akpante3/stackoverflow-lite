import db from '../db/dbconnect';


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


/**  create a User
 * @param {string}
 * @return {string}
 * @public
*/
const createUser = (email, password, userName) => {
  if (!email || !password || !userName) {
    return Promise.reject(new Error(`please include username,
   password and valid email`));
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  return db.one(`INSERT INTO users (email, password, name) 
  VALUES($1,$2,$3) RETURNING id `, [email, hashedPassword, userName])
    .then((data) => {
      const token = jwt.sign(
        { id: data.id, name: userName }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
      console.log(token);
      return Promise.resolve(token);
    }).catch(e => console.log(e));
};
/**  Get all Users
 * @return {obj}
 * @public
*/
const allUsers = () => {
  return db.any('select * from users')
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  login user
 * @param {string}
 * @return {obj}
 * @public
*/
const login = (email, password) => {
  return db.one('SELECT * FROM users WHERE email =$1', email)
    .then((data) => {
      const passwordIsValid = bcrypt.compareSync(password, data.password);
      const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
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
  bcrypt,
  jwt,
  login,
};
