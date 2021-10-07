const mssql = require('mssql');
const pool = require('../db/db');

class TaskModel {
    tableName = 'tasks'

   find = async () => {
       const sql = `SELECT * FROM ${this.tableName} WHERE isDeleted = 0`;

       const results = await (await pool).request().query(sql);

       return results.recordsets[0]
   }
    
    findTaskById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = '${id}' AND isDeleted = 0`

        const result = await (await pool).request().query(sql);
        return result.recordsets[0][0]
    }

    deleteTask = async (id) => {
        const sql = `UPDATE ${this.tableName} SET isDeleted = 1 WHERE id = '${id}'`

        const result = await (await pool).request().query(sql);
        const affectedRows = result ? result.rowsAffected : 0;

        return affectedRows;

    }

    selectAllTasksByProjectsAndUsers = async () => {
         const sql = `SELECT t.id, t.task_name, t.duration as task_Duration, t.description as task_Description, t.project_id, p.project_name, s.username 
                    FROM dbo.tasks t
                    INNER JOIN dbo.projects p ON t.project_id = p.id 
                    INNER JOIN dbo.users s ON s.id = t.user_id`
         const results = await (await pool).request().query(sql)
        return results.recordsets[0]
    }

    createTask = async (task) => {
        const results = await (await pool).request()
            .input('task_name', mssql.VarChar(50), task.task_name)
            .input('description', mssql.Time(0), task.description)
            .input('duration', mssql.VarChar(250), task.duration)
            .input('project_id', mssql.Int, task.project_id)
            .input('user_id', mssql.Int, task.user_id)
            .execute('uspInsertInToTasks')
        
        return results.recordsets
    }
}

module.exports = new TaskModel