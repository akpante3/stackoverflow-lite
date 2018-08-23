import express from 'express';

import {
  postQuestion,
  getAll,
  getOne,
  postAnswer,
  deleteQuestion,
} from './../controller/question';


const questionRoutes = express.Router();

// GET all Questions
questionRoutes.get('/questions', (req, res) => {
  getAll().then((questions) => {
    res.send({
      results: questions,
    });
  }).catch(() => res.status(400).send({ error: 'An Error Occured' }));
});
//  GET a question
questionRoutes.get('/questions/:id', (req, res) => {
  getOne(req.params.id).then((question) => {
    res.send({
      results: question,
    });
  }).catch(() => res.status(400).send({ error: 'No question with that id exist' }));
});
// POST a question
questionRoutes.post('/questions', (req, res) => {
  postQuestion(req.body.question).then((question) => {
    res.send({
      results: question,
    });
  }).catch(() => res.status(404).send({ error: '"question" cannot be found' }));
});
// POST answer
questionRoutes.post('/questions/:id/answers', (req, res) => {
  postAnswer(req.params.id, req.body.answer).then((answer) => {
    res.send({
      results: answer,
    });
  }).catch(() => res.status(404).send({ error: '"answer" cannot be found' }));
});
// DELETE question
questionRoutes.delete('/questions/:id', (req, res) => {
  deleteQuestion(req.params.id).then(() => {
    res.status(200).send('question was DELETED');
  }).catch(error => res.status(400).send({ error }));
});


module.exports = questionRoutes;
