const express = require('express');
const {register, login} = require('../controllers/auth');

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
// router.get('/me', protect, getMe);
// router.post('/forgotpassword', forgotPassword);



module.exports = router;