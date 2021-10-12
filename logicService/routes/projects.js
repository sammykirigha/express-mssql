const express = require('express');
const projectsControllers = require('../controllers/projects');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();



router.get('/', awaitHandlerFactory(projectsControllers.getAllProjects));
router.get('/:id', awaitHandlerFactory(projectsControllers.getProjectById));
router.delete('/:id', awaitHandlerFactory(projectsControllers.deleteProject));
router.put('/:id', awaitHandlerFactory(projectsControllers.updateProject));
router.post('/create', awaitHandlerFactory(projectsControllers.createProject));

module.exports = router;