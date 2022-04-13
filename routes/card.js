const router = require('express').Router();
const { getCards, deleteCard, createCard } = require('../controllers/card');
// const { deleteCard } = require('../controllers/card');
module.exports = router;
// GET / cards — возвращает все карточки
// DELETE / cards /: cardId — удаляет карточку по идентификатору
// POST / cards — создаёт карточку
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', createCard);

router.get('/', (req, res) => {
  res.send('Root / Main Page');
});