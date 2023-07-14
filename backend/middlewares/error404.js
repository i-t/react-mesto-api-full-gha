const NotFoundError = require('../utils/errors/NotFoundError');

module.exports = (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
};
