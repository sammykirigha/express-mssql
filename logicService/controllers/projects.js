const db = require('../db/db');
const { v4: uuidv4 } = require("uuid");
const { validateProject } = require('../helpers/validateProject');
const HttpException = require('../utils/httpException');
const parseResults = require('../helpers/parserResults');


class ProjectController {
    getAllProjects = async (req, res, next) => {
        try {
            const { uid } = req.params;
            if (!uid) return res.status(400).send({ message: "User id is required please...." })
            let result = await db.exec("getProjects", { user_id: uid });
            const Projects = parseResults(result)
            res.status(200).json(Projects)
        } catch (error) {
            console.log(error);
            if (error.message) return res.status(500).json(error)
            res.status(404).json(error)
        }
        // let projectsList = await (await db.exec('getProjects')).recordsets[0]
        // if (!projectsList.length) {
        //     throw new HttpException(404, 'Projects not found')
        // }
        // projectsList = projectsList.map(project => {
        //     const { isDeleted, ...otherInformation } = project
        //     return otherInformation
        // })
        // res.send(projectsList)
    }

    getProjectById = async (req, res, next) => {
        // const {uid, pid} = req.params;
        // if (!uid || !pid) return res.status(400).send({ message: "Id is required" })
        // try {
        //     let result = await db.exec('getProjects', {
        //         user_id: uid,
        //         project_id: pid
        //     })
        //     const project = parseResults(result, true)
        //     res.status(200).json({project})
        // } catch (error) {
        //     if (error.message) return res.status(500).json(error)
        //     res.status(404).json(error)
        // }
        const { id } = req.params;
        const project = await (await db.exec('getProject', {id})).recordsets[0][0]
        if (!project) {
            throw new HttpException(404, 'Project not found')
        }

        const { isDeleted, ...otherInformation } = project
        return res.send({...otherInformation})
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
            const { error } = validateProject(req.body);

            if (error) return res.status(400).send({ success: false, message: error.details[0].message })

            const {
                project_name,
                start_date,
                duration,
                description,
                team_lead_id,
                initial_activity,
            } = req.body
            
        const id = uuidv4()
        const results = await (await db.exec('uspInsertInToProjects', {
                id,
                project_name,
                start_date,
                duration,
                description,
                team_lead_id,
                initial_activity,
            })).recordsets

            if (!results) {
                throw new HttpException(500, "Something went wrong")
            }
            res.status(201).send('Project was created')
    }
    

        updateProject = async (req, res, next) => {
            const {
                project_name,
                start_date,
                duration,
                description,
                team_lead_id,
                initial_activity,
            } = req.body

           
            const result = await (await db.exec('uspUpdateProjects', {
                id,
                project_name,
                start_date,
                duration,
                description,
                team_lead_id,
                initial_activity,
            }))


        if (result ===  0) {
                throw new HttpException(404, 'Something went wrong try again later')
            }
            res.send("Project updated successfully")

            
    }
}

module.exports = new ProjectController