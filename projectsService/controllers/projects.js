const ProjectModel = require('../models/projects');
const HttpException = require('../utills/httpException');


class ProjectController {
    getAllProjects = async (req, res, next) => {
        let projectsList = await ProjectModel.find()
        if (!projectsList.length) {
            throw new HttpException(404, 'Projects not found')
        }
        projectsList = projectsList.map(project => {
            const { isDeleted, ...otherInformation } = project
            return otherInformation
        })
        res.send(projectsList)
    }

    getProjectById = async (req, res, next) => {
        const id = req.params.id;
        const project = await ProjectModel.findOne(id)
        if (!project) {
            throw new HttpException(404, 'Project not found')
        }

        const {isDeleted, ...otherInformation} = project
        res.send({...otherInformation})
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
        res.status(201).send('Project was created')
    }

        updateProject = async (req, res, next) => {
        const projectId = req.params.id;
        const project = await ProjectModel.findOne(projectId);
        const { id, ...projectWithId } = project;
        const updatebody = { ...projectWithId, ...req.body };
            const result = await ProjectModel.update(id, updatebody)
            console.log('result', result);
            console.log('request', req.body);
            console.log('updatebody', updatebody);


        if (result ===  0) {
                throw new HttpException(404, 'Something went wrong try again later')
            }
            res.send("Project updated successfully")

            
    }
}

module.exports = new ProjectController