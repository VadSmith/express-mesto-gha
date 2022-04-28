const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getUser, patchUser, patchAvatar, getUsersMe,
} = require('../controllers/user');

module.exports = router;

// Получение своего профиля
router.get('/users/me', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), getUsersMe);

// Получение всех юзеров
router.get('/users', getUsers);

// Получение юзера по ID
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), getUser);
// router.get('/users/me', getMe);

// Создание юзера
// router.post('/users', createUser);

// Обновление профиля юзера
router.patch('/users/me', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), patchUser);

// Обновление аватара
router.patch('/users/me/avatar', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), patchAvatar);
