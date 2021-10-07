const sql = require("mssql");
const config = require("../config");

const connectToDb = async () => {
  try {
    const pool = await sql.connect(config)
    return pool;
  } catch (error) {
    throw new Error(error);
  }
};

const createRequest = (request, data = {}) => {
  const keys = Object.keys(data);

  keys.map((keyName) => {
    const keyValue = data[keyName];
    request.input(keyName, keyValue);
  });
  return request;
};

const exec = async (procName, data = {}) => {
  const pool = await connectToDb();
  var request = await pool.request();
  request = createRequest(request, data);

  const results = await request.execute(procName);
  return results;
};

const query = async (query, options) => {
  const pool = await connectToDb();
  var request = await pool.request();
  const results = request.query(query);
  return results;
};
module.exports = {
  exec,
  query
};