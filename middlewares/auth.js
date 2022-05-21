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
    console.log('auth.js try payload', Date.now());
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return res
  //     .status(401)
  //     .send({ message: 'Необходима авторизация!' });
  //   // return next(new UnauthorizedError('Неправильный email или пароль'));
  // }

  // const token = authorization.replace('Bearer ', '');
  // let payload;

  // try {
  //   payload = jwt.verify(token, JWT_SECRET);
  // } catch (err) {
  //   return res
  //     .status(401)
  //     .send({ message: 'Необходима авторизация' });
  //   // return next(new UnauthorizedError('Неправильный email или пароль'));
  // }

  // req.user = payload; // записываем пейлоуд в объект запроса

  // return next(); // пропускаем запрос дальше
};

// module.exports = (req, res, next) => {
//   if (!req.cookies.jwt) {
//     return next(new UnauthorizedError('Неправильный email или пароль'));
//   }
//   const token = req.cookies.jwt;
//   console.log('cookie.jwt in auth: ', token);
//   let payload;
//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return next(new UnauthorizedError('Неправильный email или пароль'));
//   }
//   req.user = payload;
//   return next();
// };
