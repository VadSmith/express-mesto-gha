const router = require('express').Router();
const { getCards, deleteCard, createCard, getCard } = require('../controllers/card');
// const { deleteCard } = require('../controllers/card');
module.exports = router;
// GET / cards — возвращает все карточки
// DELETE / cards /: cardId — удаляет карточку по идентификатору
// POST / cards — создаёт карточку
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.get('/cards/:cardId', getCard);
router.post('/cards', createCard);