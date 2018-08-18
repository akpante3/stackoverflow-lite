const expect = require('expect');
const request = require('supertest');

const { app } = require('./../../app');
const { Questions } = require('./../controller/question');


describe('POST /questions', () => {
  // POST a question
  it('should create a new question', (done) => {
    const question = {
      id: Questions.length + 1,
      answers: [],
      question: 'testing question',
    };

    request(app)
      .post('/questions')
      .set('Accept', 'application/json')
      .send(question)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        expect((req) => {
          expect(req.body.id).toBeTruthy();
        });
        return done();
      });
  });

  // POST NOTHING
  it('should not create a question', (done) => {
    request(app)
      .post('/questions')
      .send({})
      .expect(400)
      .end(done());
  });
});

// GET a question
describe('/questions/:id', () => {
  it('should fetch one question', (done) => {
    const obj = { question: 'testing', id: 3, answers: [] };
    Questions.push(obj);
    request(app)
      .get('/questions/3')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(3);
      })
      .end(done());
  });


  // if question is not found
  it('should not fetch with invalid body', (done) => {
    request(app)
      .get('/questions/id')
      .set('Accept', 'application/json')
      .expect(400)
      .end(done());
  });
});

// GET all questions
describe('/questions', () => {
  it('should fetch all the questions', (done) => {
    const obj = { question: 'testing', id: 4, answers: [] };
    Questions.push(obj);
    request(app)
      .get('/questions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done());
  });
});

// POST an answer
describe('/questions/:id/answers', () => {
  it('should delete a question', (done) => {
    const obj = { question: 'testing', id: 6, answers: [] };
    Questions.push(obj);
    request(app)
      .post('/questions/6/answers')
      .set('Accept', 'application/json')
      .send({ answer: 'test case' })
      .expect((res) => {
        expect(res.body.answer).toBe('test case');
      })
      .expect(200)
      .end(done());
  });

  // if id is not found
  it('should not create an answers', (done) => {
    request(app)
      .post('/questions/0/answers')
      .send({ answer: 'test case' })
      .expect(400)
      .end(done());
  });
});

// DELETE a question
describe('/questions/:id', () => {
  it('should delete a question', (done) => {
    const obj = { question: 'testing', id: 7, answers: [] };
    Questions.push(obj);
    request(app)
      .delete('/questions/7')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        expect(Questions.indexOf(obj)).toBe(-1);
        return done();
      });
  });
});