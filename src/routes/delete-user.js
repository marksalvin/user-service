const userDeleter = require('../db/user-deleter');
const userGetter = require('../db/user-getter');

const deleteUser = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  try {
    const user = await userGetter(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    await userDeleter(id);

    return res.status(204).end();
  } catch (err) {
    return res.status(500).send('Service unavailable :(');
  }
};

module.exports = deleteUser;
