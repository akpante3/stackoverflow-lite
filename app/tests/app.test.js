const expect = require('expect');
const request = require('supertest');

const { app, Questions } = require('./../app');


describe('POST /questions', () => {
  // POST a question
  it('should create a new question', (done) => {
    const question = {
      id: Questions.length + 1,
      answers: [],
      question: 'tesing question',
    };

    request(app)
      .post('/questions')
      .set('Accept', 'application/json')
      .send(question)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((req) => {
        expect(req.body.id).toBeTruthy();
      })
      .end((err) => {
        if (err) return done(err);
        expect(Questions.length).toBe(1);
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


