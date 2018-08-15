import { error } from "util";

const Questions = [];
// Get all Questions
const getAll = () => Promise.resolve(Questions);

// Get one question
const getOne = (id) => {
  const questionId = parseInt(id, 10);
  const question = Questions.find(q => q.id === questionId);
  if (!question) return Promise.reject(new Error('pass valid id'));
  return Promise.resolve(question);
};

//  POST a question
const postQuestion = (question) => {
  const post = {
    id: Questions.length + 1,
    answers: [],
    question,
  };
  if (!question) return Promise.reject(new Error('post a question'));

  Questions.push(post);
  console.log(post);
  return Promise.resolve(post);
};

// POST answer
const postAnswer = (questionId, answer) => {
  const id = parseFloat(questionId);
  const newAnswer = answer;
  const question = Questions.find(q => q.id === id);
  const index = Questions.indexOf(question);
  const post = {
    id: question.answers.length + 10,
    answer: newAnswer,
  };
  if (!post.answer) return Promise.reject(new Error('post an answer'));
  question.answers.push(post);
  Questions.splice(index, 1, question);
  return Promise.resolve(post);
};

// DELETE question
const deleteQuestion = (id) => {
  const questionId = parseFloat(id);
  const index = Questions.findIndex(q => q.id === questionId);
  Questions.splice(index, 1);
  return Promise.resolve('question was Deleted');
};

module.exports = {
  getAll,
  getOne,
  postQuestion,
  postAnswer,
  deleteQuestion,
  Questions,
};
