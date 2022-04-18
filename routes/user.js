const router = require('express').Router();
const {
  getUsers, getUser, createUser, patchUser, patchAvatar,
} = require('../controllers/user');

module.exports = router;

// Получение всех юзеров
router.get('/users', getUsers);

// Получение юзера по ID
router.get('/users/:userId', getUser);

// Создание юзера
router.post('/users', createUser);

// Обновление профиля юзера
router.patch('/users/me', patchUser);

// Обновление аватара
router.patch('/users/me/avatar', patchAvatar);
