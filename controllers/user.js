const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => res.send({ user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
