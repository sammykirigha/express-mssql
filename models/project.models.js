const config = require('../db/dbConfig');
const mssql = require('mssql');

class ProjectModel {
    tableName = 'projects';

    find = async () => {
        const pool = await mssql.connect(config)
        const sql = `SELECT * FROM ${this.tableName}`
        const result = await pool.request().query(sql)

        return result.recordsets[0];
    }

    findOne = async (param) => {
        const pool = await mssql.connect(config);
        const sql = `SELECT * FROM ${this.tableName} WHERE id = '${param}'`
        const results = await pool.request().query(sql);
        return results.recordsets[0][0]
    }

    create = async (project) => {
        const pool = await mssql.connect(config);
        let results = await pool.request()
            .input('project_name', mssql.VarChar(50), project.project_name)
            .input('duration', mssql.VarChar(100), project.duration)
            .execute('uspInsertProjects')
        return results.recordsets
    }

    delete = async (id) => {
        const pool = await mssql.connect(config);
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} `
        const result = await pool.request().query(sql)
        const affectedRows = result ? result.rowsAffected : 0;
        return affectedRows
    }
}

module.exports = new ProjectModel