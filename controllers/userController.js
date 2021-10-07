const service = require('../services/userService');
const messages = require('../helpers/validationMessages');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await service.createUser({ name, email, password, role: 'user' });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    if (result === null) return res.status(409).json(messages.EMAIL_ALREADY_EXISTS);

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await service.createUser({ name, email, password, role: 'admin' });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    if (result === null) return res.status(409).json(messages.EMAIL_ALREADY_EXISTS);

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await service.loginUser(email, password);
    const token = result;

    if (result === false) return res.status(401).json(messages.MUST_BE_FILLED);
    if (result === null) return res.status(401).json(messages.INCORRECT_DATA);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = {
  createUser,
  createAdmin,
  loginUser,
};