const Card = require('../models/card');

// Получение списка карточек
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// // Поиск карточки по ID
// module.exports.getCard = (req, res) => {
//   Card.findById(req.params.cardId)
//     .then((card) => res.send({ card }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// // Создание карточки
const createCard = (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    }) // создадим документ на основе пришедших данных
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.removeById(req.params.cardId)
    .then(console.log("Card deleted"))
    .catch(() => res.status(404).send({ message: 'Карточка не найдена' }))
}
// module.exports = deleteCard = (req, res) => {
//   Card.removeById(req.params.cardId)
//     .then(console.log("Card deleted"))
//     .catch(() => res.status(404).send({ message: 'Карточка не найдена' }))
// };

module.exports = {
  deleteCard,
  getCards,
  deleteCard
}