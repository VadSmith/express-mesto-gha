const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../controllers/user');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   console.log('auth.js token: ', token);
//   // const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
//   //if (!token) {
//   //  return next(new UnauthorizedError('Ошибка авторизации'));
//   //}

//   let payload;
//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     // return next(err);
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }
//   req.user = payload;

//   return next();
// };
