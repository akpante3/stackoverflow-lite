import {
  getAll,
  getOne,
  postQuestion,
  postAnswer,
  deleteQuestion,
} from './../controller/question';
/** Get all question
 * @param {obj}
 * @return {obj}
 * @public
*/
const allquestion = (req, res) => {
  getAll().then((questions) => {
    res.send({
      results: questions,
    });
  }).catch(() => res.status(400).send({ error: 'An Error Occured' }));
};
/** Get a question
 * @param {obj}
 * @return {obj}
 * @public
*/
const aQuestion = (req, res) => {
  getOne(req.params.id).then((question) => {
    res.send({
      results: question,
    });
  }).catch(() => res.status(400).send({ error: 'No question with that id exist' }));
};
/** post question
 * @param {obj}
 * @return {obj}
 * @public
*/
const newQuestion = (req, res) => {
  postQuestion(req.body.question).then((question) => {
    res.send({
      results: question,
    });
  }).catch(() => res.status(404).send({ error: '"question" cannot be found' }));
};
/** post answer
 * @param {obj}
 * @return {obj}
 * @public
*/
const newAnswer = (req, res) => {
  postAnswer(req.params.id, req.body.answer).then((answer) => {
    res.send({
      results: answer,
    });
  }).catch(() => res.status(404).send({ error: '"answer" cannot be found' }));
};
/** delete question
 * @param {obj}
 * @return {string}
 * @public
*/
const questionDelete = (req, res) => {
  deleteQuestion(req.params.id).then(() => {
    res.status(200).send('question was DELETED');
  }).catch(error => res.status(400).send({ error }));
};

export {
  newQuestion,
  aQuestion,
  allquestion,
  newAnswer,
  questionDelete,
};
