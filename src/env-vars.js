const { str, num, bool, cleanEnv } = require('envalid');

const env = cleanEnv(process.env, {
  PORT: num(),
  MONGODB_URL: str(),
  CONTEXT_ROUTE: str(),
});

console.info('Required environment variables are present');

module.exports = env;
