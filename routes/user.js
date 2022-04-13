const router = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/user');
module.exports = router;

router.get('/users', getUsers);


router.get('/users/:userId', getUser);
router.post('/users', createUser);

router.get('/', (req, res) => {
  res.send('Root / Main Page');
});
