const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Card = require('../models/card');

// Получение списка карточек
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return next(new NotFoundError("Карточки не найдены"));
      }
      res.send(cards)
    })
    .catch((err) => {
      next(err);
    });
};

// Создание карточки
const createCard = (req, res, next) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner },
    // {
    // new: true, // обработчик then получит на вход обновлённую запись
    // runValidators: true, // данные будут валидированы перед изменением
    // upsert: true // если элемент не найден, он будет создан
    // }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные'))
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.deleteOne({ "_id": req.params.cardId })
    .then((result) => {
      // console.log(`Deleted ${result.deletedCount} cards`);
      if (result.deletedCount > 0) {
        res.send({ message: 'Карточка удалена' })
      } else {
        return next(new NotFoundError('Ошибка: Карточки с таким ID не найдено'))
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        return next(new CastError("Ошибка: Некорректный формат ID карточки"))
      }
      next(err);
    })
}

// Поиск карточки по ID
const getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Карточки не существует"));
      }
      res.send({ card })
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    // if (!card) {
    //   return next(new NotFoundError("Карточки не существует"));
    // }
    res.send({ card })
  })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new CastError("Ошибка: Некорректный формат ID карточки"))
      }
    })
  next(err);
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