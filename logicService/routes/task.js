const express = require('express');
const tasksControllers = require('../controllers/tasks');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();



router.get('/:pid', awaitHandlerFactory(tasksControllers.getAllTasks));
router.get('/information', awaitHandlerFactory(tasksControllers.getTasksByProjectsAndUsers))
router.get('/:pid/:tid', awaitHandlerFactory(tasksControllers.getTaskById));
router.delete('/:id', awaitHandlerFactory(tasksControllers.deleteTask));
router.put('/:id', awaitHandlerFactory(tasksControllers.updateTask));
router.post('/create', awaitHandlerFactory(tasksControllers.createTask));

module.exports = router;