const db = require('../db/db');
const ProjectModel = require('../models/projects');
const HttpException = require('../utils/httpException');


class ProjectController {
    getAllProjects = async (req, res, next) => {
        let projectsList = await (await db.exec('getProjects')).recordsets[0]
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
        const project = await (await db.exec('getProject', {id})).recordsets[0][0]
        if (!project) {
            throw new HttpException(404, 'Project not found')
        }

        const {isDeleted, ...otherInformation} = project
        res.send({...otherInformation})
    }

    deleteProject = async (req, res, next) => {
        const id = req.params.id
        const result = await (await db.exec('deleteProject', { id })).rowsAffected
        if (!result) {
            throw new HttpException(404, 'Project is not found')
        }
        res.send('Project has being deleted')
    }

    createProject = async (req, res, next) => {
        console.log(req.body);
          const {
            project_name,
            start_date,
            duration,
            description,
            team_lead,
            initial_activity,
        } = req.body
        const results = await (await db.exec('uspInsertInToProjects', {
            project_name,
            start_date,
            duration,
            description,
            team_lead,
            initial_activity,
        })).recordsets
        if (!results) {
            throw new HttpException(500, "Something went wrong")
        }
        res.status(201).send('Project was created')
    }

        updateProject = async (req, res, next) => {
            const id = req.params.id;
            const {
                project_name,
            start_date,
            duration,
            description,
            team_lead,
            initial_activity,
            } = req.body
            const result = await (await db.exec('uspUpdateProjects', {
                id,
                project_name,
                start_date,
                duration,
                description,
                team_lead,
                initial_activity,
            }))


        if (result ===  0) {
                throw new HttpException(404, 'Something went wrong try again later')
            }
            res.send("Project updated successfully")

            
    }
}

module.exports = new ProjectController