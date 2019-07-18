const { users } = require('../../models');

const updateStatus = async (id, status) => {
  const checkUser = await users.findById(id);
  const data = await checkUser.update({ status }, { fields: ['status'] });
  return data;
};

const findUser = async (email, phone) => {
  const data = await users.findOne({
    where: {
      email,
      phone,
    },
  });
  return data;
};

const createUser = async (name, email, phone, password) => {
  const data = await users.create({
    name,
    email,
    phone,
    password,
  });
  return data;
};

module.exports = {
  updateStatus,
  findUser,
  createUser,
};
