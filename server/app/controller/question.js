import promise from 'bluebird';

import pgp from 'pg-promise';

const options = {
  promiseLib: promise,
};

const pg = pgp(options);

const connectionString = 'postgres://postgres:123456@localhost:5432/questiondb';
const db = pg(connectionString);

// Get all Questions
const getAll = () => {
  return db.any('select * from questions')
    .then((data) => {
      return Promise.resolve(data);
    });
};

// Get one question
const getOne = (id) => {
  const questionId = parseFloat(id);
  return db.task(t => t.batch([
    t.one('SELECT id, question FROM questions WHERE id =$1', questionId),
    t.any('SELECT answer_id,answer FROM answers WHERE answers.question_id =$1', questionId),
  ])).spread((question, answers) => {
    question.answers = answers;
    return question;
  })

    .then((data) => {
      return Promise.resolve(data);
    });
};

//  POST a question
const postQuestion = (question) => {
  if (!question) return Promise.reject(new Error('post a question'));
  return db.one('INSERT INTO questions (question) VALUES($1) RETURNING id', question)
    .then((data) => {
      return Promise.resolve(data);
    });
};

// POST answer
const postAnswer = (questionId, answer) => {
  const id = parseFloat(questionId);
  const newAnswer = answer;
  return db.one('INSERT INTO answers (question_id,answer) VALUES($1,$2) RETURNING answer_id', [id, newAnswer])
    .then((data) => {
      return Promise.resolve(data);
    });
};

// DELETE question
const deleteQuestion = (id) => {
  if (!id) return Promise.reject(new Error('question is not Found'));
  const questionId = parseFloat(id);
  console.log(questionId);
  return db.result('DELETE FROM questions where id = $1', questionId)
    .then((data) => {
      return Promise.resolve(data);
    });
};

export {
  getAll,
  getOne,
  postQuestion,
  postAnswer,
  deleteQuestion,
};
