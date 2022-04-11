const express = require('express');
const mongoose = require('mongoose');

const { PORT = 300 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log('Express is on port 3000!');
});
