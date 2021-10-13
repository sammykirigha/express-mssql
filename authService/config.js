const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const { PORT, HOST, HOST_URL, DB_USER, DB_SERVER, DB_PASS, DB_DATABASE } = process.env

const sqlEncrypt = process.env.DB_ENCRYPT === 'true'

assert(PORT, 'PORT is required')
assert(HOST, 'HOST, is required')

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: DB_SERVER,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASS,
        pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
        },
        options: {
        trustedConnection: true,
        encrypt: sqlEncrypt, // for azure 
        trustServerCertificate: true,
        enableArithAbort: true // change to true for local dev / self-signed certs
        }
    }
}