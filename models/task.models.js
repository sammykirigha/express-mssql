const mssql = require('mssql');
const config = require('../db/dbConfig');

class TaskModel {
    tableName = 'tasks'

   find = async () => {
       const pool = await mssql.connect(config);
       const sql = `SELECT * FROM ${this.tableName}`;

       const results = await pool.request().query(sql);

       return results.recordsets[0]
   }
    
    findTaskById = async (id) => {
        const pool = await mssql.connect(config);
        const sql = `SELECT * FROM ${this.tableName} WHERE id = '${id}'`

        const result = await pool.request().query(sql);
        return result.recordsets[0][0]
    }

    deleteTask = async (id) => {
        const pool = mssql.connect(config);
        
    }
}