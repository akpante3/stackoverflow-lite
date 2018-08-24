import promise from 'bluebird';

import pgp from 'pg-promise';

const options = {
  promiseLib: promise,
};

const pg = pgp(options);

const connectionString = 'postgres://postgres:123456@localhost:5432/questiondb';
const db = pg(connectionString);

module.exports = db;
