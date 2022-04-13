const User = require('../models/user');

// Получение списка юзеров
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Поиск юзера по ID
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Создание юзера
module.exports.createUser = (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // console.log(name, about, avatar);
  // res.send(req.body);
  // console.log(req.body);
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    }) // создадим документ на основе пришедших данных
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};
