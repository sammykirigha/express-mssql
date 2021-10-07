const mssql = require('mssql');
const config = require('../config');

const pool = mssql.connect(config.sql)

module.exports = pool;

class Connection {
    constructor() {
        this.connecToDb();
        this.exec=this.exec.bind(this);
    }

    connecToDb = async () => {
        try {
            this.pool = await mssql.connect(config.sql)
            console.log("Connected to the database.....");
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }


    createRequest = (request, data = {}) => {
        const keys = Object.keys(data);

        keys.map((keyName) => {
            const keyValue = data[keyName]
            request.input(keyName, keyValue)
        })
        return request
    }

    exec = async (procName, data = {}) => {
        var request = await this.pool.request();
        request = this.createRequest(request, data)

        const results = await request.execute(procName)
        return results
    }

    query = async (query, options) => {
        const results = await this.pool.request().query(query)
        return results
    }
}

module.exports = {
    exec: new Connection().exec,
    query: new Connection().query
}