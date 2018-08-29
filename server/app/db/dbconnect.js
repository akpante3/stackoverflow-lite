import promise from 'bluebird';
import path from 'path';
import pgp, { QueryFile } from 'pg-promise';
import '../../config/config';

const options = {
  promiseLib: promise,
};

const pg = pgp(options);

const connectionString = process.env.DATABASE_URL;
const db = pg(connectionString);
const scriptPath = path.join(__dirname, 'schema.sql');

const file = new QueryFile(scriptPath);

db.none(file)
  .then(e => console.log('successfully created dabatase'))
  .catch(z => console.log(z));

export default db;
