require('dotenv').config({ silent: true });
const env = require('./src/env-vars');
const { app } = require('./server');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

app.listen(env.PORT, () => {
  console.info('Server running on port %d', env.PORT);
});

process.on('SIGTERM', () => {
  console.info('Shutting down...');
});
