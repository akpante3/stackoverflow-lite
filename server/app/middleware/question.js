import {
  getAll,
  getOne,
  postQuestion,
  postAnswer,
  deleteQuestion,
  favAnswer,
} from './../controller/question';
import { error } from 'util';
/** Get all question
 * @param {object}
 * @return {object}
 * @public
*/
const allquestion = (req, res) => {
  getAll().then((questions) => {
    res.send({
      status: 'success',
      message: 'questions were succcessfully fetched',
      data: questions,
    });
  }).catch(() => res.status(404).send({
    status: 'failure',
    message: 'questions not found',
  }));
};
/** Get a question
 * @param {object}
 * @return {object}
 * @public
*/
const aQuestion = (req, res) => {
  getOne(req.params.id).then((question) => {
    res.send({
      status: 'success',
      message: 'question was succcessfully fetched',
      data: question,
    });
  }).catch(() => {
    res.status(404).send({
      status: 'failure',
      message: 'question was not found',
    });
  });
};
/** post question
 * @param {object}
 * @return {object}
 * @public
*/
const newQuestion = (req, res) => {
  postQuestion(req.body.question, req.userId).then((result) => {
    res.status(201).send({
      status: 'success',
      message: 'question was posted succcessfully',
      data: result,
    });
  }).catch(() => res.status(400).send({
    status: 'failure',
    message: 'please input a valid question',
  }));
};
/** post answer
 * @param {object}
 * @return {object}
 * @public
*/
const newAnswer = (req, res) => {
  postAnswer(req.params.id, req.body.answer, req.userId).then((result) => {
    res.status(201).send({
      status: 'success',
      message: 'answer was posted succcessfully',
      data: result,
    });
  }).catch(() => res.status(404).send({
    status: 'NOT FOUND',
    message: 'please insert valid answer',
  }));
};
/** delete question
 * @param {object}
 * @return {string}
 * @public
*/
const questionDelete = (req, res) => {
  deleteQuestion(req.params.id).then(() => {
    res.status(200).send({
      status: 'success',
      message: 'answer was posted succcessfully',
    });
  }).catch(() => res.status(404).send({
    status: 'NOT FOUND',
    message: 'Question was not found',
  }));
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
      message: 'Answer was accepted by user',
    });
  }).catch(() => res.status(404).send({
    status: 'NOT FOUND',
    message: 'answer was not found',
  }));
};

export {
  newQuestion,
  aQuestion,
  allquestion,
  newAnswer,
  questionDelete,
  markDownAnswer,
};
