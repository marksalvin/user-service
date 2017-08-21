const test = require('tape');
const proxyquire = require('proxyquire').noCallThru();

test('that env vars are validated', t => {
  const fakeEnvalid = {
    str: () => 'str',
    num: () => 'num',
    bool: () => 'bool',
    cleanEnv: (env, config) => {
      t.deepEquals(config, {
        PORT: 'num',
        MONGODB_URL: 'str',
        CONTEXT_ROUTE: 'str',
      }, 'Correct config passed to env vars');
    },
  };

  const module = proxyquire('../../src/env-vars', {
    'envalid': fakeEnvalid
  });

  t.end();
});
