const test = require('tape');
const request = require('supertest');
const timekeeper = require('timekeeper');
const env = require('../../src/env-vars');
const { app } = require('../../server');
const User = require('../../src/db/user-model');
const clearDownUserDB = () => User.remove();

test('delete a user', t => {
  t.test('returns a 404 when the user is not found', async t => {
    await clearDownUserDB();

    const fakeUserId = '41224d776a326fb40f000001';

    const res = await request(app)
      .del(`/user-service/v1/user/$fakeUserId}`);
            
    t.equal(res.status, 404);
    t.end();
  });

  t.test('deletes the user from it\'s id', async t => {
    timekeeper.freeze(new Date('2010-10-10'));    

    const fakeData = {
      email: 'fake email',
      forename: 'fake forename',
      surname: 'fake surname',
    };

    await clearDownUserDB();

    const { _id: userId } = await User.create(fakeData);

    const user = await User.find({ _id: userId });

    t.equals(user.length, 1, 'User exists before delete');
      
    const res = await request(app)
      .del(`/user-service/v1/user/${userId}`);

    t.equal(res.status, 204);

    const deletedUser = await User.find({ _id: userId }); 
    
    t.equals(deletedUser.length, 0, 'User doesn\'t exist after delete');
    
    timekeeper.reset();

    t.end();
  });
});
