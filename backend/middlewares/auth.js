const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const SECRET_KEY = 'super-secret-key';

function checkToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new UnauthorizedError('Нет заголовка авторизации'));
  }
  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
    return next();
  } catch (err) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }
};

module.exports = {
  signToken,
  auth,
};
