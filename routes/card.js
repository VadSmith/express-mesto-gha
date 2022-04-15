const router = require('express').Router();
const { getCards, deleteCard, createCard, getCard, likeCard, dislikeCard } = require('../controllers/card');
// const { deleteCard } = require('../controllers/card');
module.exports = router;

// GET / cards — возвращает все карточки
// DELETE / cards /: cardId — удаляет карточку по идентификатору
// POST / cards — создаёт карточку
// PUT / cards /: cardId / likes — поставить лайк карточке
// DELETE / cards /: cardId / likes — убрать лайк с карточки

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.get('/cards/:cardId', getCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);