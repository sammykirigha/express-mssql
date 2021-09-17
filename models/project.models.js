const mssql = require('mssql');
const pool = require('../db/dbConnections');

class ProjectModel {
    tableName = 'projects';

    find = async () => {
        const sql = `SELECT * FROM ${this.tableName}`
        const result = await (await pool).request().query(sql)

        return result.recordsets[0];
    }

    findOne = async (param) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = '${param}'`
        const results = await (await pool).request().query(sql);
        return results.recordsets[0][0]
    }

    create = async (project) => {
        let results = await (await pool).request()
            .input('project_name', mssql.VarChar(50), project.project_name)
            .input('duration', mssql.VarChar(100), project.duration)
            .execute('uspInsertProjects')
        return results.recordsets
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} `
        const result = await (await pool).request().query(sql)
        const affectedRows = result ? result.rowsAffected : 0;
        return affectedRows
    }
}

module.exports = new ProjectModel