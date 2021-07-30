const express = require('express');
const router = express.Router();

const {signin, signout, signup, userById} = require('../controllers/authController')

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signout', signout)

module.exports = router;