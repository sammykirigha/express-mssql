const sql = require('mssql');
const config = require('./dbConfig')

const connection = async () => {
    return sql.connect(config).then(pool => {
        if (pool.connecting) {
            console.log('Connecting to the database');
        }
        if (pool.connected) {
            console.log('Connected to SQL Server');
        }
    })
}

module.exports = connection;
