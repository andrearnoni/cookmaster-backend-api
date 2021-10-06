const connection = require('./connection');

const emailExists = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user !== null;
};

const createUser = async ({ name, email, password, role }) => {
  const db = await connection();
  const userRegistry = await db.collection('users')
    .insertOne({ name, email, password, role });

  return {
    user: {
      name,
      email,
      role,
      _id: userRegistry.insertedId,
    },
  };
};

const loginUser = async (email) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ email });

  return userData;
};

module.exports = {
  emailExists,
  createUser,
  loginUser,
};