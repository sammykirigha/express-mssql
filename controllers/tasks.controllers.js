const TaskModel = require("../models/task.models");
const HttpException = require("../utils/HttpException.utils");

class TasksControllers {

    getAllTasks = async (req, res, next) => {
        let tasks = await TaskModel.find();

        if (!tasks.length) {
            throw new HttpException(404, 'Tasks not found')
        }

        res.send(tasks)
    }

    getTaskById = async (req, res, next) => {
        const id = req.params.id;

        const task = await TaskModel.findTaskById(id);
        if (!task) {
            throw new HttpException(404, 'task does not exist')
        }

        res.send(task)
    }

    deleteTask = async (req, res, next) => {
        const id = req.params.id
        
        const result = await TaskModel.deleteTask(id);
        if (!result) {
            throw new HttpException(404, 'Task trying to delete is not found')
        }

        res.send('Task deleted successfully')
    }

    createTask = async (req, res, next) => {
        const task = req.body

        const result = await TaskModel.createTask(task);
        if (!result) {
            throw new HttpException(500, 'An error occured while creating a task')
        }

        res.status(201).send('Task was created successfully')
    }
}