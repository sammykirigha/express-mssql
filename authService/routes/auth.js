const express = require('express');
const authController = require('../controllers/auth');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();

router.post('/signup', awaitHandlerFactory(authController.registerUser));
router.post('/login', awaitHandlerFactory(authController.loginUser))

module.exports = router;