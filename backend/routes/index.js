const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const error404 = require('../middlewares/error404');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const { validateCreateUser, validateLogin } = require('../middlewares/valiadation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('/*', error404);

module.exports = router;
