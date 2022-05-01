const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../controllers/user');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  if (!req.cookies.jwt) {
    return next(new UnauthorizedError('Неправильный email или пароль'));
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
  }
  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Неправильный email или пароль'));

    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
