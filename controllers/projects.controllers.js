const ProjectModel = require('../models/project.models');
const HttpException = require('../utils/HttpException.utils');


class ProjectController {
    getAllProjects = async (req, res, next) => {
        let projectsList = await ProjectModel.find()

        if (!projectsList.length) {
            throw new HttpException(404, 'Projects not found')
        }

        res.send(projectsList)
    }

    getProjectById = async (req, res, next) => {
        const id = req.params.id;

        const project = await ProjectModel.findOne(id)

        if (!project) {
            throw new HttpException(404, 'Project not found')
        }
    }

    deleteProject = async (req, res, next) => {
        const id = req.params.id

        const result = await ProjectModel.delete(id)

        if (!result) {
            throw new HttpException(404, 'Project is not found')
        }

        res.send('Project has being deleted')
    }

    createProject = async (req, res, next) => {
        const project = req.body;

        const result = await ProjectModel.create(project);

        if (!result) {
            throw new HttpException(500, "Something went wrong")
        }
    }
}