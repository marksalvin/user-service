const test = require('tape');
const request = require('supertest');
const timekeeper = require('timekeeper');
const env = require('../../src/env-vars');
const { app } = require('../../server');
const User = require('../../src/db/user-model');
const clearDownUserDB = () => User.remove();

test('create a user', t => {
  t.test('returns a 400 when the payload is invalid', async t => {
    const fakeData = {};

    await clearDownUserDB();
    const res = await request(app)
      .post('/user-service/v1/user')
      .send(fakeData);
          
    t.equal(res.status, 400);
    t.end();
  });

  t.test('returns a 201 when the user is created', async t => {
    timekeeper.freeze(new Date('2010-10-10'));    

    const fakeData = {
      email: 'fake email',
      forename: 'fake forename',
      surname: 'fake surname',
    };

    await clearDownUserDB();
      
    const res = await request(app)
      .post('/user-service/v1/user')
      .send(fakeData);

    t.equal(res.status, 201);

    const user = await User.find({ _id: res.body.id });
    
    t.equals(user.length, 1, 'User created by API found in database');
    t.equals(user[0].email, 'fake email', 'User email set');
    t.equals(user[0].forename, 'fake forename', 'User forename set');
    t.equals(user[0].surname, 'fake surname', 'User surname set');
    t.deepEquals(new Date(user[0].created_at), new Date('2010-10-10'), 'User created at set');
    
    timekeeper.reset();

    t.end();
  });
});
