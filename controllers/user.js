const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
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
  )
    .then(user => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден"));
      }
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя'));
      };
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные'));
      };
      next(err);
    });
};

// Обновить аватар
const patchAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      // upsert: true
    }
  )
    .then(user => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден"));
      }
      res.send(user)

    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя'));
      };
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные'));
      };
      next(err);
    });
};

// Получение списка юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return next(new NotFoundError("Пользователей нет"));
      }
      res.send(users)
    })
    .catch((err) => {
      next(err);
    });
};

// Поиск юзера по ID
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден"));
      }
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя'));
      };
      next(err);
    });
};

// Создание юзера
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create(
    [{ name, about, avatar }],
    {
      new: true,
      runValidators: true,
      // upsert: true
    }
  ).then((user) => {
    console.log(user)
    res.send(user);
  }).catch(err => {
    console.log(err.toString());
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Ошибка: Введены некорректные данные!'))
    }
    next(err);
  })
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  patchUser,
  patchAvatar
}