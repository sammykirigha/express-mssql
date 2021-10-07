const mssql = require('mssql');
const pool = require('../db/db');
const db = require('../db/db')

class ProjectModel {
    tableName = 'projects';

    find = async () => {
        // const sql = `SELECT * FROM ${this.tableName} WHERE isDeleted = 0`
        const result = await db.exec('getProjects')
        return result.recordsets[0];
    }

    findOne = async (param) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = '${param}' AND isDeleted = 0`
        const results = await (await pool).request().query(sql);
        return results.recordsets[0][0]
    }

    create = async (project) => {
        let results = await (await pool).request()
            .input('project_name', mssql.VarChar(50), project.project_name)
            .input('start_date', mssql.Date, project.start_date)
            .input('duration', mssql.VarChar(100), project.duration)
            .input('description', mssql.VarChar(250), project.description)
            .input('team_lead', mssql.VarChar(50), project.team_lead)
            .input('initial_activity', mssql.VarChar(100), project.initial_activity)
            .input('isDeleted', mssql.Int, project.isDeleted)
            .execute('uspInsertInToProjects')
        return results.recordsets
    }

    update = async (id, project) => {
        try {
             let result = await (await pool).request()
            .input('id', mssql.Int, id)
            .input('project_name', mssql.VarChar(50), project.project_name)
            .input('start_date', mssql.Date, project.start_date)
            .input('duration', mssql.VarChar(100), project.duration)
            .input('description', mssql.VarChar(250), project.description)
            .input('team_lead', mssql.VarChar(50), project.team_lead)
            .input('initial_activity', mssql.VarChar(100), project.initial_activity)
            .execute('uspUpdateProjects')
            // const affectedRows = results ? results.rowsAffected : 0
            // console.log('<<<<<<<<<<<<<<<<<<>>>>>>', result.rowsAffected[0]);
        return result.rowsAffected[0]
        } catch (error) {
            return error.message
        }
       
    }

    delete = async (id) => {
        const sql = `UPDATE ${this.tableName} SET isDeleted = 1 WHERE id = ${id} `
        const result = await (await pool).request().query(sql)
        const affectedRows = result ? result.rowsAffected : 0;
        return affectedRows
    }
}

module.exports = new ProjectModel