const sql = require('mssql');
const config = require('./dbConfig')

const pool = sql.connect(config)

module.exports = pool;
