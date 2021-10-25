const express = require('express');
const projectsControllers = require('../controllers/projects');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();

router.get('/:uid', awaitHandlerFactory(projectsControllers.getAllProjects));
router.get('/project/:id', awaitHandlerFactory(projectsControllers.getProjectById));
router.delete('/:id', awaitHandlerFactory(projectsControllers.deleteProject));
router.put('/:id', awaitHandlerFactory(projectsControllers.updateProject));
router.post('/create', awaitHandlerFactory(projectsControllers.createProject));

module.exports = router;