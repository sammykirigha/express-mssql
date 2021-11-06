const express = require('express');
const usersController = require('../controllers/users');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidation');

router.get('/', awaitHandlerFactory(usersController.getAllUsers));
router.get('/:id', awaitHandlerFactory(usersController.getUserById));
router.delete('/:id', awaitHandlerFactory(usersController.deleteUser));
router.put('/:id', updateUserSchema, awaitHandlerFactory(usersController.updateUser));
router.post('/create', awaitHandlerFactory(usersController.insertUsersAssigned));
router.get('/assigned/users', awaitHandlerFactory(usersController.getUserAssigned))

module.exports = router;