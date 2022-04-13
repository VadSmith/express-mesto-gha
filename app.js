const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    // вставьте сюда _id созданного в предыдущем пункте пользователя
    _id: '62568bf46a9e6d1712d3a026'
  };

  next();
});

app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.listen(PORT, () => {
  console.log('Express is on port 3000!');
});
