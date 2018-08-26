import expect from 'expect';
import request from 'supertest';

import app from './../../app';

const Questions = [];

describe('POST /questions', () => {
  it('should create a new question when all conditions are meet', (done) => {
    request(app)
      .post('/questions')
      .set('Accept', 'application/json')
      .end((err) => {
        if (err) return done(err);
        expect((req) => {
          expect(req.body.id).toBeTruthy();
        });
        return done();
      });
  });

  it('should not create a question', (done) => {
    request(app)
      .post('/questions')
      .send({})
      .expect(404)
      .end(done());
  });
});

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

  it('should not fetch a question when id is invalid', (done) => {
    request(app)
      .get('/questions/id')
      .set('Accept', 'application/json')
      .expect(400)
      .end(done());
  });
});

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

describe('/questions/:id/answers', () => {
  it('should delete a question', (done) => {
    const obj = { question: 'testing', id: 6, answers: [] };
    Questions.push(obj);
    request(app)
      .post('/questions/6/answers')
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.body.answer).toBe('test case');
      })
      .expect(200)
      .end(done());
  });

  it('should not create an answers when all conditions are meet', (done) => {
    request(app)
      .post('/questions/0/answers')
      .expect(404)
      .end(done());
  });
});

describe('/questions/:id', () => {
  it('should delete a question', (done) => {
    const obj = { question: 'testing', id: 7, answers: [] };
    Questions.push(obj);
    request(app)
      .delete('/questions/7')
      .set('Accept', 'application/json')
      .expect(200)
      .end(done());
  });
});

describe('/auth/signup', () => {
  it('should sign up a new user when all conditions are meet', (done) => {
    request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .end((err) => {
        if (err) return done(err);
        expect((req) => {
          expect(req.body.id).toBeTruthy();
        });
        return done();
      });
  });
});

describe('/auth/login', () => {
  it('should log in a registered user when all conditions are meet', (done) => {
    request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .end((err) => {
        if (err) return done(err);
        expect((req) => {
          expect(req.body.password).toBeTruthy();
        });
        return done();
      });
  });
});


