const express = require('express');
const projectsControllers = require('../controllers/projects.controllers');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();



router.get('/', awaitHandlerFactory(projectsControllers.getAllProjects));
router.get('/id/:id', awaitHandlerFactory(projectsControllers.getProjectById));
router.delete('/id/:id', awaitHandlerFactory(projectsControllers.deleteProject));
// router.patch('/id/:id', awaitHandlerFactory(usersController.updateUser));
router.post('/create', awaitHandlerFactory(projectsControllers.createProject));

module.exports = router;