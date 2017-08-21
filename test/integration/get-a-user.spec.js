const test = require('tape');
const request = require('supertest');
const timekeeper = require('timekeeper');
const env = require('../../src/env-vars');
const { app } = require('../../server');
const User = require('../../src/db/user-model');
const clearDownUserDB = () => User.remove();

test('get a user', t => {
  t.test('returns a 404 when the user is not found', async t => {
    await clearDownUserDB();
  
    const res = await request(app)
      .get('/user-service/v1/user/fake-user-id');
          
    t.equal(res.status, 404);
    t.end();
  });

  t.test('returns the user from it\'s id', async t => {
    timekeeper.freeze(new Date('2010-10-10'));    

    const fakeData = {
      email: 'fake email',
      forename: 'fake forename',
      surname: 'fake surname',
    };

    await clearDownUserDB();

    const { _id: userId } = await User.create(fakeData);
      
    const res = await request(app)
      .get(`/user-service/v1/user/${userId}`);

    t.equal(res.status, 200);
    
    t.equals(res.body.id, userId.toString(), 'User id set');
    t.equals(res.body.email, 'fake email', 'User email set');
    t.equals(res.body.forename, 'fake forename', 'User forename set');
    t.equals(res.body.surname, 'fake surname', 'User surname set');
    t.deepEquals(new Date(res.body.created_at), new Date('2010-10-10'), 'User created at set');
    
    timekeeper.reset();

    t.end();
  });
});
