const User = require('../models/user');


// Обновить профиль
const patchUser = (req, res) => {
  User.findByIdAndUpdate(req.params._id, { name: req.body.name, about: req.body.about })
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err.message))
};

// Обновить аватар
const patchAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.params._id,
    { avatar: req.body.avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true // если пользователь не найден, он будет создан
    }
  )
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err.message))
};
// Получение списка юзеров
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err.message));
};

// Поиск юзера по ID
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user)
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Создание юзера
const createUser = (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    }) // создадим документ на основе пришедших данных
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));

};

module.exports = {
  createUser,
  getUser,
  getUsers,
  patchUser,
  patchAvatar
}