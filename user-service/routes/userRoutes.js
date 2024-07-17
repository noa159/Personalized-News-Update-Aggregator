const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, changePreferences } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/updatePreferences', changePreferences)
router.get('/:jwt', getUser);

module.exports = router;
