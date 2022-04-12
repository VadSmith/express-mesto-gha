const router = require('express').Router();
const { getUsers } = require('../controllers/user');

router.get('/users', getUsers);

module.exports = router;
