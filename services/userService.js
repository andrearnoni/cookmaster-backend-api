require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/userModel');

const { SECRET, EXPIRE, ALG } = process.env;

const jwtConfig = {
  expiresIn: EXPIRE,
  algorithm: ALG,
};

const validateFieldsCreate = (name, email, password) => {
  if (!name || !email || !password) return false;
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return false;

  return true;
};

const validateFieldsLogin = (email, password) => {
  if (!email || !password) return false;

  return true;
};

const createUser = async ({ name, email, password, role }) => {
  const emailExists = await UsersModel.emailExists(email);
  const validation = validateFieldsCreate(name, email, password);

  if (emailExists) return null;
  if (!validation) return false;

  return UsersModel.createUser({ name, email, password, role });
};

const loginUser = async (email, password) => {
  const validation = validateFieldsLogin(email, password);
  const userSearch = await UsersModel.loginUser(email);

  if (!validation) return false;

  if (!userSearch || userSearch.password !== password) return null;

  const { _id: id, role } = userSearch;
  const userWithoutPassword = {
    id,
    email,
    role,
  };

  const token = jwt.sign({ data: userWithoutPassword }, SECRET, jwtConfig);

  return token;
};

module.exports = {
  createUser,
  loginUser,
};