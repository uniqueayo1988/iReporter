import expect from 'expect';
import request from 'supertest';
import db from '../db';
import app from '../server';

const userDetails = {
  firstname: 'ade',
  lastname: 'segun',
  othernames: 'olude',
  email: 'adeb@gmail.com',
  phoneNumber: '0808080',
  username: 'adesegun',
  password: 'adeb'
};

before(async () => {
  const users = 'DELETE FROM users';
  await db.query(users);
});

describe('POST /api/v1/auth/signUp', () => {
  it('should create a new record', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(userDetails)
      .set('Accept', 'application/json')
      // .expect(201, done);
      .expect(201)
      .expect((res) => {
        expect(res.body.data[0].user.firstName).toBe('ade');
        expect(res.body.data[0].user.lastName).toBe('segun');
        // expect(res.body.status).toBe(201).toBeA('number');
      })
      .end(done);
  });
});
