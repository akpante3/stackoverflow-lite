import {
  getAll,
  getOne,
  postQuestion,
  postAnswer,
  deleteQuestion,
  favAnswer,
} from './../controller/question';
/** Get all question
 * @param {obj}
 * @return {obj}
 * @public
*/
const allquestion = (req, res) => {
  getAll().then((questions) => {
    res.send({
      status: 'success',
      message: 'question was succcessfully fetched',
      data: questions,
    });
  }).catch(() => res.status(400).send({ error: 'could not find Questions' }));
};
/** Get a question
 * @param {obj}
 * @return {obj}
 * @public
*/
const aQuestion = (req, res) => {
  getOne(req.params.id).then((question) => {
    res.send({
      results: {
        status: 'success',
        message: 'question was succcessfully fetched',
        data: question,
      },
    });
  }).catch(() => {
    res.status(400).send({ error: 'No question with that id exist' })
  });
};
/** post question
 * @param {obj}
 * @return {obj}
 * @public
*/
const newQuestion = (req, res) => {
  postQuestion(req.body.question, req.userId).then((result) => {
    res.send({
      results: {
        status: 'success',
        message: 'question was posted succcessfully',
        data: result,
      },
    });
  }).catch(() => res.status(404).send({ error: '"question" cannot be found' }));
};
/** post answer
 * @param {obj}
 * @return {obj}
 * @public
*/
const newAnswer = (req, res) => {
  postAnswer(req.params.id, req.body.answer).then((result) => {
    res.send({
      status: 'success',
      message: 'answer was posted succcessfully',
      data: result,
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
    res.status(200).send('question was DELETED successfully');
  }).catch(error => res.status(400).send({ error }));
};
/** Favourite Anwer
 * @param {obj}
 * @return {obj}
 * @public
*/
const markDownAnswer = (req, res) => {
  favAnswer(req.params.answerId).then(() => {
    res.status(200).send({
      status: 'success',
      message: 'answer was accepted',
    });
  }).catch(() => res.status(404).send({ error: '"answer" cannot be found' }));
};

export {
  newQuestion,
  aQuestion,
  allquestion,
  newAnswer,
  questionDelete,
  markDownAnswer,
};
