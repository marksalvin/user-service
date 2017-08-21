const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const helmet = require('helmet');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const env = require('./src/env-vars');
const apiRoutes = require('./src/routes');
const User = require('./src/db/user-model');

const app = express();

const contextRoute = express.Router();

mongoose.connect(env.MONGODB_URL);

contextRoute.use(helmet());

contextRoute.use(responseTime());

contextRoute.use(cors());

contextRoute.use(bodyParser.urlencoded({
  extended: false,
}));
contextRoute.use(bodyParser.json());

apiRoutes(contextRoute);

contextRoute.use((req, res, next, err) => res.status(500).send('Service unavailable :('));

app.use(env.CONTEXT_ROUTE, contextRoute);

app.shutdown = () => {
  mongoose.disconnect();
};

module.exports = {
  app,
};
