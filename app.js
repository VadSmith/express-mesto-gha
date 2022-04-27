const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/user');

const { PORT = 3000, BASE_URL = 'http://localhost:3000' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // next are deprecated
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   req.user = {
//     // вставьте сюда _id созданного в предыдущем пункте пользователя
//     _id: '625988c51279959a16458236',
//   };
//   next();
// });
// app.use((req, res, next) => {
//   // res.status(200).send({ message: req.cookies });
//   console.log(req.cookies.jwt);
//   res.status(200);
//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(require('./routes/card'));
app.use(require('./routes/user'));

app.use((req, res) => {
  res.status(404).send({ message: 'Cтраница не найдена' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Express is on port 3000!', BASE_URL);
});
