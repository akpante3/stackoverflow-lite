import promise from 'bluebird';

import pgp from 'pg-promise';

const options = {
  promiseLib: promise,
};

const pg = pgp(options);

const connectionString = 'postgres://postgres:123456@localhost:5432/questiondb';
const db = pg(connectionString);

//  POST a Users
const createUser = (email, password) => {
  if (!email || !password) return Promise.reject(new Error('post a question'));
  return db.one('INSERT INTO users (email, password) VALUES($1,$2) RETURNING id', [email, password])
    .then((data) => {
      return Promise.resolve(data);
    });
};
// GetAll
const allUsers = () => {
  return db.any('select * from users')
    .then((data) => {
      return Promise.resolve(data);
    });
};


export {
  createUser,
  allUsers,
};
