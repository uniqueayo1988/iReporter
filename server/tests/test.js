import expect from 'expect';
import request from 'supertest';
import RedflagModel from '../models/Red-flag';
import app from '../../server';

const redflag = {
  title: 'water',
  location: 'coke',
  image: 'pix.jpg',
  comment: 'hello how are'
};

const redflagRecord = RedflagModel.create(redflag);

// Test for 'POST /api/v1/red-flags' endpoint
describe('POST /api/v1/red-flags', () => {
  it('should create a new record', (done) => {
    request(app)
      .post('/api/v1/red-flags')
      .send(redflag)
      .expect(201)
      .end(done);
  });

  it('should test for response status', (done) => {
    request(app)
      .post('/api/v1/red-flags')
      .send(redflag)
      .expect((res) => {
        expect(res.body.status).toBe(201).toBeA('number');
      })
      .end(done);
  });

  it('should test for response message', (done) => {
    request(app)
      .post('/api/v1/red-flags')
      .send(redflag)
      .expect((res) => {
        expect(res.body.data[0].message).toBe('Created red-flag record');
      })
      .end(done);
  });

  it('should test for invalid record', (done) => {
    request(app)
      .post('/api/v1/red-flags')
      .send(!redflag)
      .expect(400)
      .end(done);
  });
});

// Test for 'GET /api/v1/red-flags' endpoint
describe('GET /api/v1/red-flags', () => {
  it('should get all records', (done) => {
    request(app)
      .get('/api/v1/red-flags')
      .expect(200, done);
  });

  it('should test for response status', (done) => {
    request(app)
      .get('/api/v1/red-flags')
      .expect((res) => {
        expect(res.body.status).toBe(200).toBeA('number');
      })
      .end(done);
  });

  it('should test for Headers', (done) => {
    request(app)
      .get('/api/v1/red-flags')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(done);
  });
});

// Test for 'GET /api/v1/red-flags/:id' endpoint
describe('GET /api/v1/red-flags/:id', () => {
  it('should get a specific record', (done) => {
    request(app)
      .get(`/api/v1/red-flags/${redflagRecord.id}`)
      .expect(200, done);
  });

  it('should test for invalid record id', (done) => {
    request(app)
      .get(`/api/v1/red-flags/${redflagRecord.id}1`)
      .expect(404, done);
  });
});
