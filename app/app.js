const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Questions = [

];


// post a question
app.post('/questions', (req, res) => {
  const post = { id: Questions.length + 1, answers: [] };
  post.question = req.body.question;
  if (!post.question) { return res.status(400); }
  Questions.push(post);
  res.send({ id: post.id });
});


// get all questions
app.get('/questions', (req, res) => {
  const q = Questions.map((question) => {
    return {
      question: question.question,
      id: question.id,
    };
  });
  res.send(q);
});

// get a question
app.get('/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const singleQuestion = Questions.find(question => question.id === id);
  if (!singleQuestion) { return res.status(400); }
  res.send(singleQuestion);
});

// POST an answer
app.post('/questions/:id/answers', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newAnswer = req.body.answer;
  const quesTion = Questions.find(question => question.id === id);
  const index = Questions.indexOf(quesTion);
  if (!index) { return res.status(400); }
  const post = {
    id: quesTion.answers.length + 10,
    answer: newAnswer,
  };
  quesTion.answers.push(post);
  Questions.splice(index, 1, quesTion);
  res.send(post);
});

//  Delete a question
app.delete('/questions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const targetQuestion = Questions.find(question => question.id === id);
  const index = Questions.indexOf(targetQuestion);
  Questions.splice(index, 1);
  res.status(200).send('Deleted');
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = { app, Questions };
