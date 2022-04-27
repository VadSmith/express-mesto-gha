const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../controllers/user');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  if (!req.cookies.jwt) {
    return res
      .status(403)
      .send({ message: 'Необходима авторизация' });
  }
  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
