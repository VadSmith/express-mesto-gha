const router = require('express').Router();
const { getUsers, getUser } = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);

module.exports = router;
