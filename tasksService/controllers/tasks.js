const TaskModel = require("../models/task");
const HttpException = require("../utils/httpException");

class TasksControllers {

    getAllTasks = async (req, res, next) => {
        let tasks = await TaskModel.find();

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
        let allTasksInfo = await TaskModel.selectAllTasksByProjectsAndUsers()

        if (!allTasksInfo.length) {
            res.send('Information not found')
        }

        res.send(allTasksInfo)
    }

    getTaskById = async (req, res, next) => {
        const id = req.params.id;

        const task = await TaskModel.findTaskById(id);
        if (!task) {
            throw new HttpException(404, 'task does not exist')
        }

        const {isDeleted, ...otherInforation} = task

        res.send({...otherInforation})
    }

    deleteTask = async (req, res, next) => {
        const task_id = req.params.id
        
        const result = await TaskModel.deleteTask(task_id);
        // console.log('result<<<<>>>!', result);
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

module.exports = new TasksControllers