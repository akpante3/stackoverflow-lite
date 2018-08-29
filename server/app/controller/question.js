import db from '../db/dbconnect';
/** Get all question
 * @return {obj}
 * @public
*/
const getAll = () => {
  return db.any('select * from questions')
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  Get one question
 * @param {string}
 * @return {obj}
 * @public
*/
const getOne = (id) => {
  const questionId = parseFloat(id);
  return db.task(data => data.batch([
    data.one('SELECT id, question FROM questions WHERE id =$1', questionId),
    data.any(`SELECT answer_id,answer FROM answers
     WHERE answers.question_id =$1 `, questionId),
  ])).spread((question, answers) => {
    question.answers = answers;
    return question;
  })
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  POST a question
 * @param {string}
 * @return {obj}
 * @public
*/
const postQuestion = (question, userId) => {
  if (!question) return Promise.reject(new Error('post a question'));
  return db.one(`INSERT INTO questions (question, user_id)
   VALUES($1, $2) RETURNING id `, [question, userId])
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  POST answer
 * @param {string}
 * @return {obj}
 * @public
*/
const postAnswer = (questionId, answer) => {
  const id = parseFloat(questionId);
  const newAnswer = answer;
  return db.one(`INSERT INTO answers (question_id,answer,is_favourite)
   VALUES($1,$2,$3) RETURNING answer_id `, [id, newAnswer, false])
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  DELETE question
 * @param {string}
 * @return {string}
 * @public
*/
const deleteQuestion = (id) => {
  if (!id) return Promise.reject(new Error('question is not Found'));
  const questionId = parseInt(id, 10);
  return db.result('DELETE FROM questions where id = $1', questionId)
    .then((data) => {
      return Promise.resolve(data);
    });
};
/**  Get answer
 * @param {string}
 * @return {string}
 * @public
*/
const favAnswer = (answerId) => {
  const id = parseInt(answerId, 10);
  return db.one(`UPDATE answers SET is_favourite = true
   WHERE answer_id = $1`, id)
    .then(() => {
      return Promise.resolve(true);
    });
};

export {
  getAll,
  getOne,
  postQuestion,
  postAnswer,
  deleteQuestion,
  favAnswer,
};
