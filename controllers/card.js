/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');

// Получение списка карточек
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return next(new NotFoundError('Карточки не найдены'));
      }
      res.send(cards);
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      next(err);
    });
};

// Создание карточки
const createCard = (req, res, next) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create(
    { name, link, owner },
    // { new: true, runValidators: true }
  )
    .then((card) => {
      res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка: Введены некорректные данные'));
      }
      next(err);
    });
};

// Удаление карточки
// const deleteCard = (req, res, next) => {
//   Card.deleteOne({ _id: req.params.cardId, owner: req.user._id })
//     .then((result) => {
//       if (result.deletedCount > 0) {
//         res.send({ message: 'Карточка удалена' });
//       } else {
//         return next(new ForbiddenError('Недостаточно прав'));
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return next(new CastError('Ошибка: Некорректный формат ID карточки'));
//       }
//       next(err);
//     });
// };
const deleteCard = (req, res, next) => {
  Сard.findById(req.params.cardId)
    .then((card) => {
      console.log(card);
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
        // return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (!card.owner.equals(req.user._id)) {
        console.log(!card.owner.equals(req.user._id));
        throw new ForbiddenError('Невозможно удалить чужую карточку');
        // return next(new ForbiddenError('Невозможно удалить чужую карточку'));
      }
      return card
        .remove()
        .then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(new CastError('Ошибка: Некорректный формат ID карточки'));
        return next(new CastError('Ошибка: Некорректный формат ID карточки'));
      }
      // return next(err);
      next(err);
    });
};

// Поиск карточки по ID
const getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточки не существует'));
      }
      res.send(card);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    // eslint-disable-next-line no-console
    console.log(card);
    if (!card) {
      return next(new NotFoundError('Карточки не существует'));
    }
    res.send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Некорректный формат ID карточки'));
      }
      next(err);
    });
};

// Снятие лайка
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    // { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточки не существует'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Ошибка: Некорректный формат ID карточки'));
      }
      next(err);
    });
};

module.exports = {
  deleteCard,
  getCards,
  createCard,
  getCard,
  likeCard,
  dislikeCard
};