const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../controllers/user');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
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
