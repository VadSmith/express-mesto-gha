const router = require('express').Router();
const {
  getUsers, getUser, patchUser, patchAvatar, getUsersMe,
} = require('../controllers/user');

module.exports = router;

// Получение всех юзеров
router.get('/users', getUsers);

// Получение юзера по ID
router.get('/users/:userId', getUser);
// router.get('/users/me', getMe);

// Создание юзера
// router.post('/users', createUser);

// Обновление профиля юзера
router.patch('/users/me', patchUser);

// Получение своего профиля
router.get('/users/me', getUsersMe);

// Обновление аватара
router.patch('/users/me/avatar', patchAvatar);
