const express = require('express');

const { PORT = 300 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log('Express is on port 3000');
});