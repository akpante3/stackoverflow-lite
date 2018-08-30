import db from '../db/dbconnect';
/** Get all question
 * @return {obj}
 * @public
*/
const getAll = () => {
  return db.any(`select questions.id, question, name from questions 
  left join users on questions.user_id = users.id `)
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
  const questionId = parseInt(id, 10);
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
const postAnswer = (questionId, answer, userId) => {
  if (!answer) return Promise.reject(new Error('please post an answer'));
  const id = parseInt(questionId, 10);
  const newAnswer = answer;
  console.log(userId, newAnswer, questionId);
  return db.one(`INSERT INTO answers (question_id,answer,is_favourite,user_id)
   VALUES($1,$2,$3,$4) RETURNING answer_id `, [id, newAnswer, false, userId])
    .then((data) => {
      return Promise.resolve(data);
    }).catch((error)=>{
    console.log(error)
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
    }).catch((error) => {
      console.log(error)
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
