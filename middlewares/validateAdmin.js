require('dotenv').config();
const jwt = require('jsonwebtoken');
const messages = require('../helpers/validationMessages');

const secret = process.env.SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  
  try {
    const decoded = jwt.verify(token, secret);

    if (decoded.data.role !== 'admin') return res.status(403).json(messages.ONLY_ADMINS);

    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = validateJWT;