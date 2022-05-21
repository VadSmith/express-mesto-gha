const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../controllers/user');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('auth.js token: ', token);
  // const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  //if (!token) {
  //  return next(new UnauthorizedError('Ошибка авторизации'));
  //}

  let payload;
  try {
    console.log('auth.js try payload');
    payload = jwt.verify(token, secret);
  } catch (err) {

    // return next(new UnauthorizedError('Необходима авторизация'));
    return next(err);
  }
  req.user = payload;

  return next();
};
