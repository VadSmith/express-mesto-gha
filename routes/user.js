const router = require('express').Router();
const { getUsers } = require('../controllers/user');

router.get('/users', getUsers);
// router.get('/users', (req, res) => {
//   console.log(req.baseUrl);
// });
