const pool = require('../db/db')
const mssql = require('mssql');

class UserModel {

    tableName = 'users';

    find = async() => {
        const sql = `SELECT * FROM ${this.tableName} WHERE isDeleted = 0`;
        const results = await ( await pool).request().query(sql);
        return results.recordsets[0];
    }

    findOne = async (param) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${param}`
        const results = await (await pool).request().query(sql);
        return results.recordsets[0][0]
    }

    findOneByEmail = async (email) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE email = '${email}' AND isDeleted = 0`
        const results = await (await pool).request().query(sql);
        // console.log('result>>>>>>>',results.recordsets[0][0]);
        return results.recordsets[0][0]
    }

    create = async (user) => {
        let results = await (await pool).request()
            .input('username', mssql.VarChar(50), user.username)
            .input('password', mssql.Char(100), user.password)
            .input('full_name', mssql.VarChar(50), user.full_name)
            .input('age', mssql.Int, user.age)
            .input('role', mssql.VarChar(50), user.role)
            .input('gender', mssql.VarChar(50), user.gender)
            .input('email', mssql.VarChar(100), user.email)
            .input('project_id', mssql.Int, user.project_id)
            .execute('uspInsertInToUsers')
        return results.recordsets
    }

    update = async (id, user) => {
        let results = await (await pool).request()
            .input('id', mssql.Int, id)
            .input('username', mssql.VarChar(50), user.username)
            .input('full_name', mssql.VarChar(50), user.full_name)
            .input('age', mssql.Int, user.age)
            .input('role', mssql.VarChar(50), user.role)
            .input('gender', mssql.VarChar(50), user.gender)
            .input('email', mssql.VarChar(100), user.email)
            .execute('uspUpdateInToUsers')
        // console.log(results.rowsAffected[0]);
        return results.rowsAffected[0]
    }

    delete = async (id) => {
        const sql = `UPDATE ${this.tableName} SET isDeleted = 1 WHERE id = ${id} `
        const result = await (await pool).request().query(sql)
        const affectedRows = result ? result.rowsAffected : 0;
        return affectedRows
    } 
}

module.exports = new UserModel
