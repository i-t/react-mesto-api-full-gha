require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3001',
];
app.use(cors(allowedCors));

// app.use('/post', (req, res, next) => {
//   res.setHeader(
//     'Access-Control-Allow-Origin',
//     '*',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type',
//   );
//   next();
// });

app.use(express.json());

app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(3000, () => {
  console.log('Server is running');
});
