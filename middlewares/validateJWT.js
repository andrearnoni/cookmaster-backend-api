require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/userModel');
const messages = require('../helpers/validationMessages');

const secret = process.env.SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(messages.MISSING_TOKEN);
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.loginUser(decoded.data.email);

    if (!user) return res.status(401).json(messages.INVALID_TOKEN);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json(messages.INVALID_TOKEN);
  }
};

module.exports = validateJWT;