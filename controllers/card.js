const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

// Получение списка карточек
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

// // Создание карточки
const createCard = (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    }) // создадим документ на основе пришедших данных
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.deleteOne({ "_id": req.params.cardId })
    .then(res.send({ message: 'Карточка удалена' }))
    .catch((err) => next(err));

  // .catch((err) => res.status(500).send({ err.message }))
}

// Поиск карточки по ID
const getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => res.send({ card }))
    .catch((err) => res.status(err.statusCode).send(err.message));
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }))
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports = {
  deleteCard,
  getCards,
  createCard,
  getCard,
  likeCard,
  dislikeCard
}