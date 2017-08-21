const userUpdater = require('../db/user-updater');
const userGetter = require('../db/user-getter');

const updateUser = async (req, res) => {
  const {
    params: {
      id,
    },
    body: {
      email,
      forename,
      surname,
    },
  } = req;

  try {
    const user = await userGetter(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const { _id: userId } = await userUpdater(id, email, forename, surname);
    return res.status(201).json({ id: userId });
  } catch (err) {
    return res.status(500).send('Service unavailable :(');
  }
};

module.exports = updateUser;
