const express = require('express');
const usersController = require('../controllers/users');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidation');

router.get('/', awaitHandlerFactory(usersController.getAllUsers));
router.get('/:id', awaitHandlerFactory(usersController.getUserById));
router.delete('/:id', awaitHandlerFactory(usersController.deleteUser));
router.put('/:id', updateUserSchema, awaitHandlerFactory(usersController.updateUser));
router.post('/signup', createUserSchema, awaitHandlerFactory(usersController.createUser));

router.post('/login', validateLogin, awaitHandlerFactory(usersController.userLogin))

module.exports = router;