const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { PORT = 3000 } = process.env;
const app = express();

app.use(morgan('tiny'));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use('/', require('./routes/user'));
// app.use('/users', require('./routes/user'));

app.listen(PORT, () => {
  console.log('Express is on port 3000!');
});
