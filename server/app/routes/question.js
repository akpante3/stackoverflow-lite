const express = require('express');

const questionRoutes = express.Router();

const {
  postQuestion,
  getAll,
  getOne,
  postAnswer,
  deleteQuestion,
} = require('./../controller/question');


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
  }).catch(() => res.status(404).send({ error: 'An Error Occured' }));
});
// POST answer
questionRoutes.post('/questions/:id/answers', (req, res) => {
  postAnswer(req.params.id, req.body.answer).then((answer) => {
    res.send({
      results: answer,
    });
  }).catch(error => res.status(400).send({ error }));
});
// DELETE question
questionRoutes.delete('/questions/:id', (req, res) => {
  deleteQuestion(req.params.id).then(() => {
    res.status(200).send('question was DELETED');
  }).catch(error => res.status(400).send({ error }));
});


module.exports = questionRoutes;
