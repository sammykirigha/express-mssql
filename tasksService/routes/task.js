const express = require('express');
const tasksControllers = require('../controllers/tasks');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();



router.get('/', awaitHandlerFactory(tasksControllers.getAllTasks));
router.get('/information', awaitHandlerFactory(tasksControllers.getTasksByProjectsAndUsers))
router.get('/:id', awaitHandlerFactory(tasksControllers.getTaskById));
router.delete('/:id', awaitHandlerFactory(tasksControllers.deleteTask));
// router.patch('/:id', awaitHandlerFactory(usersController.updateUser));
router.post('/create', awaitHandlerFactory(tasksControllers.createTask));

module.exports = router;