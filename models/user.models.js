const config = require('../db/dbConfig');
const { multipleColumn } = require('../utils/common.utils');
const mssql = require('mssql');

class UserModel {

    tableName = 'users';

    find = async() => {
        const pool = await mssql.connect(config);
        const sql = `SELECT * FROM ${this.tableName}`;
        const results = await pool.request().query(sql);
        return results.recordsets[0];
    }


    findOne = async (param) => {
        const pool = await mssql.connect(config);
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${param}`
        const results = await pool.request().query(sql);
        return results.recordsets[0][0]
    }

    findOneByEmail = async (email) => {
        const pool = await mssql.connect(config);
        const sql = `SELECT * FROM ${this.tableName} WHERE email = '${email}'`
        const results = await pool.request().query(sql);
        console.log('result>>>>>>>',results.recordsets[0][0]);
        return results.recordsets[0][0]
    }


    create = async (user) => {
        const pool = await mssql.connect(config);
        let results = await pool.request()
            .input('username', mssql.VarChar(50), user.username)
            .input('password', mssql.Char(100), user.password)
            .input('first_name', mssql.VarChar(50), user.first_name)
            .input('last_name', mssql.VarChar(50), user.last_name)
            .input('email', mssql.VarChar(100), user.email)
            .execute('uspInsertUsers')
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

module.exports = new UserModel
