const express = require('express');
const usersController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidation');

router.get('/', awaitHandlerFactory(usersController.getAllUsers));
router.get('/id/:id', awaitHandlerFactory(usersController.getUserById));
router.delete('/id/:id', awaitHandlerFactory(usersController.deleteUser));
router.post('/signup', createUserSchema, awaitHandlerFactory(usersController.createUser));

router.post('/login', validateLogin, awaitHandlerFactory(usersController.userLogin))

module.exports = router;