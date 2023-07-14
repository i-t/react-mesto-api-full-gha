const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/BadRequestError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');

const { signToken } = require('../middlewares/auth');

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      } return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create(
      {
        name,
        about,
        avatar,
        email,
        password: hash,
      },
    ))
    .then(() => res.status(201)
      .send({
        name,
        about,
        avatar,
        email,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } return next(err);
    });
};

const getMyInfo = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

const updateInfo = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(`Некорректные данные. ${err.message}`));
      } return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(`Некорректные данные. ${err.message}`));
      } return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isEqual) => {
          if (!isEqual) {
            throw new UnauthorizedError('Неверный email или пароль');
          }
          const token = signToken({ _id: user._id });

          return res.status(200).send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getMyInfo,
  updateInfo,
  updateAvatar,
  login,
};
