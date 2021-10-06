const connection = require('./models/connection');

const createAdmin = async ({ name, email, role }) => {
  const db = await connection();
  const admRegistry = await db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

  return {
    user: {
      name,
      email,
      role,
      _id: admRegistry.insertedId,
    },
  };
};

module.exports = {
  createAdmin,
}
