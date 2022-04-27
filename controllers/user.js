const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/* eslint-disable consistent-return */
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const UserExistsError = require('../errors/UserExistsError');
const User = require('../models/user');

const JWT_SECRET = 'verysecretphrase';

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'Email или пароль не могут быть пустыми' });
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return res.status(401).send({ message: 'Неправильный email или пароль' });
      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) return res.status(401).send({ message: 'Неправильный email или пароль' });
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.status(200)
            .cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            })
            // .catch((err) => {
            //   res
            //     .status(401)
            //     .send({ message: err.message });
            // })
            .end();

          // return res.status(200).send({ token });
        });
    });
};

// Обновить профиль
const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные'));
      }
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
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные'));
      }
      next(err);
    });
};

// Получение списка юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return next(new NotFoundError('Пользователей нет'));
      }
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUsersMe = (req, res, next) => {
  console.log('getUsersMe', req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      // console.log(user);
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя!'));
      }
      next(err);
    });
};

// Поиск юзера по ID
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Введен некорректный id пользователя'));
      }
      next(err);
    });
};

// Создание юзера
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, about, avatar, email, password: hash,
      },
    ))
    .then((user) => {
      res.send(user);
    }).catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        // console.log(err);
        return next(new UserExistsError('Этот email уже занят'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные!'));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  getUsersMe,
  patchUser,
  patchAvatar,
  login,
  JWT_SECRET,
};
