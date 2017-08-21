const userCreator = require('../db/user-creator');

const createUser = async (req, res, next) => {
  const {
    body: {
      email,
      forename,
      surname,
    },
  } = req;

  try {
    const { _id: userId } = await userCreator(email, forename, surname);
    return res.status(201).json({ id: userId });
  } catch(err) {
    return res.status(500).send('Service unavailable :(');
  }
};

module.exports = createUser;
