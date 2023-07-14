const mongoose = require('mongoose');
const Card = require('../models/card');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(`Некорректные данные. ${err.message}`));
      } else {
        next(err);
      }
    });
};

const deleteCards = (req, res, next) => {
  const { cardId } = req.params;

  Card
    .findById(cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString();
      const user = req.user._id.toString();
      if (owner === user) {
        return Card.deleteOne(card)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          });
      }
      return next(new ForbiddenError('У вас недостаточно прав'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  });

const dislikeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
