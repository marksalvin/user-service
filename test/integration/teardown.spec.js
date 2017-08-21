const test = require('tape');
const { app } = require('../../server');

test.onFinish(() => {
  app.shutdown();
});