const HttpException = require("../utils/httpException");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const { validateTask } = require("../helpers/validateTask");
const parseResults = require("../helpers/parserResults");

module.exports =  {

    getAllTasks: async (req, res, next) => {
        const { pid } = req.params;
        try {
            let result = await db.exec('uspgetTasks', { project_id: pid })
            const tasks = parseResults(result)
            res.status(200).json(tasks)
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error"})
        }
    },

    getTasksByProjectsAndUsers: async (req, res, next) => {
        
        console.log('loading');
        try {
            let result = await db.exec('uspSelectTask')
            console.log(result);
            const tasks = parseResults(result)
            res.status(200).json(tasks)
        } catch (error) {
               console.log(error);
            res.status(500).send({message: "Internal Server Error"})
        }

    },

    getTaskById : async (req, res, next) => {
        const {pid, tid} = req.params;

        try {
            let result = await db.exec('getTask', { project_id: pid, task_id: tid })
            const task = parseResults(result, true)
            res.status(200).json(task)
        } catch (error) {
             console.log(error);
            res.status(500).send({message: "Internal Server Error"})
        }
        
    },


    createTask: async (req, res, next) => {
        const { error } = validateTask(req.body)
        if(error) return res.status(400).send({success: false, message: error.details[0].message})
        const {
            task_name,
            description,
            duration,
            start_date,
            status,
            project_id,
            user_id
        } = req.body
        
        const id = uuidv4()
        try {
            await db.exec('uspInsertInToTasks', {
            id,
            task_name,
            description,
            duration,
            start_date,
            status,
            project_id,
            user_id
            })
            res.send({message: "Task created successfully"})
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error"})
        }
    },


    deleteTask : async (req, res, next) => {
        const id = req.params.id
        
        const result = await (await db.exec('deleteTask', {id} )).rowsAffected
        if (!result) {
            throw new HttpException(404, 'Task trying to delete is not found')
        }

        res.send('Task deleted successfully')
    },

    updateTask : async (req, res, next) => {
        const id = req.params.id
        const {
            task_name,
            description,
            duration,
            project_id,
            user_id
        } = req.body

        const result = await (await db.exec('uspUpdateInToTasks', {
            task_name,
            description,
            duration,
            project_id,
            user_id
        }))

        if (result === 0) {
            throw new HttpException(404, "Something went wrong")
        }
        res.send("Task updated successfully")
    }
}
