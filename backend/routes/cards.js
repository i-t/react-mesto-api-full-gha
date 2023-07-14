const cardsRouter = require('express').Router();

const cardsController = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/valiadation');

cardsRouter.get('/', cardsController.getCards);
cardsRouter.post('/', validateCreateCard, cardsController.createCard);
cardsRouter.delete('/:cardId', validateCardId, cardsController.deleteCards);

cardsRouter.put('/:cardId/likes', validateCardId, cardsController.likeCard);
cardsRouter.delete('/:cardId/likes', validateCardId, cardsController.dislikeCard);

module.exports = cardsRouter;
