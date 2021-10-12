const HttpException = require("../../tasksService/utils/httpException");
const db = require("../db/db");

class TasksControllers {

    getAllTasks = async (req, res, next) => {
        let tasks = await (await db.exec('getTasks')).recordsets[0]

        if (!tasks.length) {
            throw new HttpException(404, 'Tasks not found')
        }

        const taskList = tasks.map(task => {
            const { isDeleted, ...otherInforation } = task;
            return otherInforation
            
        })

        res.send(taskList)
    }

    getTasksByProjectsAndUsers = async (req, res, next) => {
        let allTasksInfo = await (await db.exec('uspSelectTask')).recordsets[0]

        if (!allTasksInfo.length) {
            res.send('Information not found')
        }

        res.send(allTasksInfo)
    }

    getTaskById = async (req, res, next) => {
        const id = req.params.id;

        const task = await (await db.exec('getTask', {id}))
        if (!task) {
            throw new HttpException(404, 'task does not exist')
        }

        const {isDeleted, ...otherInforation} = task

        res.send({...otherInforation})
    }

    deleteTask = async (req, res, next) => {
        const id = req.params.id
        
        const result = await (await db.exec('deleteTask', {id} )).rowsAffected
        if (!result) {
            throw new HttpException(404, 'Task trying to delete is not found')
        }

        res.send('Task deleted successfully')
    }

    createTask = async (req, res, next) => {
        const {
            task_name,
            description,
            duration,
            project_id,
            user_id
        } = req.body

        const result = await (await db.exec('uspInsertInToTasks', {
            task_name,
            description,
            duration,
            project_id,
            user_id
        }))
        if (!result) {
            throw new HttpException(500, 'An error occured while creating a task')
        }

        res.status(201).send('Task was created successfully')
    }

    updateTask = async (req, res, next) => {
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

module.exports = new TasksControllers