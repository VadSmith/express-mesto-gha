const CastError = require('../errors/CastError');
const NotFound = require('../errors/NotFound');
const NotFoundError = require('../errors/NotFound');
const User = require('../models/user');

// Обновить профиль
const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { "name": req.body.name, "about": req.body.about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true // если пользователь не найден, он будет создан
    }
  ).
    orfail(new NotFound("Ошибка: Пользователь не найден"))
    .then(user => {
      // console.log(user);
      res.send(user)
    })
    // .catch(err => res.status(500).send(err.message))
    .catch(err => next(err));
};

// Обновить аватар
const patchAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true // если пользователь не найден, он будет создан
    }
  )
    .then(user => res.send(user))
    // .catch(err => res.status(500).send(err.message))
    .catch(err => next(err));
};

// Получение списка юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFound('Ни одного пользователя не найдено'))
    .then((users) => res.send(users))
    // .catch((err) => res.status(500).send(err.message));
    .catch(err => next(err));
};

// Поиск юзера по ID
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Ошибка: Введен некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

// Создание юзера
const createUser = (req, res, next) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true // если пользователь не найден, он будет создан
    }
  )
    .then((user) => {
      res.send(user);
    }) // создадим документ на основе пришедших данных
    // .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
    .catch(err => next(err));
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  patchUser,
  patchAvatar
}