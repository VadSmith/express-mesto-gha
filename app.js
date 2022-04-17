const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT = 3000, BASE_URL = 'http://localhost:3000' } = process.env;
const app = express();


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // next are deprecated
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    // вставьте сюда _id созданного в предыдущем пункте пользователя
    _id: '625988c51279959a16458236'
  };
  next();
});

app.get('/', (req, res) => {
  res.send('Root / Main Page');
});

app.use(require('./routes/card'));
app.use(require('./routes/user'));

app.patch('/404', (req, res) => {
  res.status(404).send({ message: "Такой страницы не существует" })
})

app.use((err, req, res, next) => {
  // console.log(err.toString());
  res.status(err.status).send({ message: err.message });
})

app.listen(PORT, () => {
  console.log('Express is on port 3000!', BASE_URL);
});
