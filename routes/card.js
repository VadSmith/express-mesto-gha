const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/card');
// const { deleteCard } = require('../controllers/card');
module.exports = router;

// GET / cards — возвращает все карточки
// DELETE / cards /: cardId — удаляет карточку по идентификатору
// POST / cards — создаёт карточку
// PUT / cards /: cardId / likes — поставить лайк карточке
// DELETE / cards /: cardId / likes — убрать лайк с карточки

router.get('/cards', getCards);

router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);

// router.post('/cards', createCard);
// router.put('/cards/:cardId/likes', likeCard);

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  createCard,
);

router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);
