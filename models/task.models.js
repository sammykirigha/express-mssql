const mssql = require('mssql');
const pool = require('../db/dbConnections');

class TaskModel {
    tableName = 'tasks'

   find = async () => {
       const sql = `SELECT * FROM ${this.tableName}`;

       const results = await (await pool).request().query(sql);

       return results.recordsets[0]
   }
    
    findTaskById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = '${id}'`

        const result = await (await pool).request().query(sql);
        return result.recordsets[0][0]
    }

    deleteTask = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = '${id}'`

        const result = await (await pool).request().query(sql);
        const affectedRows = result ? result.rowsAffected : 0;

        return affectedRows;

    }

    createTask = async (task) => {
        const results = await (await pool).request()
            .input('task_name', mssql.VarChar(50), task.task_name)
            .input('created_at', mssql.Time(0), task.created_at)
            .input('description', mssql.VarChar(250), task.description)
            .input('project_id', mssql.Int, task.project_id)
            .execute('uspInsertTasks')
        
        return results.recordsets
    }
}

module.exports = TaskModel