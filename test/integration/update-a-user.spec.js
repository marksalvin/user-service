const test = require('tape');
const request = require('supertest');
const timekeeper = require('timekeeper');
const env = require('../../src/env-vars');
const { app } = require('../../server');
const User = require('../../src/db/user-model');
const clearDownUserDB = () => User.remove();

test('update a user', t => {
  t.test('returns a 400 when the payload is invalid', async t => {
    const fakeData = {};

    await clearDownUserDB();
    const res = await request(app)
      .put('/user-service/v1/user/fakeid')
      .send(fakeData);
          
    t.equal(res.status, 400);
    t.end();
  });

  t.test('returns a 404 when the user is not found', async t => {
    const fakeData = {
      email: 'fake email',
      forename: 'fake forename',
      surname: 'fake surname',
    };

    await clearDownUserDB();

    const fakeUserId = '41224d776a326fb40f000001'

    const res = await request(app)
      .put(`/user-service/v1/user/${fakeUserId}`)
      .send(fakeData);
          
    t.equal(res.status, 404);
    t.end();
  });

  t.test('returns a 201 when the user is updated', async t => {
    timekeeper.freeze(new Date('2010-10-10'));    

    const fakeData = {
      email: 'fake email',
      forename: 'fake forename',
      surname: 'fake surname',
    };

    await clearDownUserDB();
      
    const { _id: userId } = await User.create(fakeData);

    const fakeUpdatedData = {
      email: 'fake updated email',
      forename: 'fake updated forename',
      surname: 'fake updated surname',
    };
    
    const res = await request(app)
      .put(`/user-service/v1/user/${userId}`)
      .send(fakeUpdatedData);

    t.equal(res.status, 201);

    const user = await User.find({ _id: res.body.id });
    
    t.equals(user.length, 1, 'User created by API found in database');
    t.equals(user[0].email, 'fake updated email', 'User email set');
    t.equals(user[0].forename, 'fake updated forename', 'User forename set');
    t.equals(user[0].surname, 'fake updated surname', 'User surname set');
    t.deepEquals(new Date(user[0].created_at), new Date('2010-10-10'), 'User created at set');
    
    timekeeper.reset();

    t.end();
  });
});
