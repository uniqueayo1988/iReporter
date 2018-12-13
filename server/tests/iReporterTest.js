import expect from 'expect';
import request from 'supertest';
import Seed from './seed';
import db from '../db';
import app from '../server';

before(async () => {
  const users = 'DELETE FROM users';
  await db.query(users);
});

describe('POST /api/v1/auth/signUp', () => {
  it('should create a new record', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.userDetails)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body.data[0].user.firstName).toBe('ade');
        expect(res.body.data[0].user.lastName).toBe('segun');
        expect(res.body.data[0].user.Email).toBe('adeb@gmail.com');
        expect(res.body.data[0].user.Username).toBe('adesegun');
      })
      .end(done);
  });

  it('should check for existing email', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.userDetails)
      .set('Accept', 'application/json')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('User with that EMAIL already exist');
      })
      .end(done);
  });

  it('should check for invalid email', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.invalidEmail)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Please enter a valid email address');
      })
      .end(done);
  });

  it('should check if firstname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.noFirstname)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Firstname is required');
      })
      .end(done);
  });

  it('should check if lastname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.noLastname)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Lastname is required');
      })
      .end(done);
  });

  it('should check if Email is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.noEmail)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Email is required');
      })
      .end(done);
  });

  it('should check if Phone Number is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.noPhoneNumber)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Phone Number is required');
      })
      .end(done);
  });

  it('should check if Username is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.noUsername)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Username is required');
      })
      .end(done);
  });

  it('should check if Password is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signUp')
      .send(Seed.noPassword)
      .set('Accept', 'application/json')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Password is required');
      })
      .end(done);
  });

});
