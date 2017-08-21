const userGetter = require('../db/user-getter');

const getUser = async (req, res, next) => {
  const {
    params: {
      id
    },
  } = req;

  try {
    const user = await userGetter(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const { _id: userId, email, forename, surname, created_at } = user;

    return res.json({ id: userId, email, forename, surname, created_at });
  } catch(err) {
    return res.status(500).send('Service unavailable :(');
  }
};

module.exports = getUser;
