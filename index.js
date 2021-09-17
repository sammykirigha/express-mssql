const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const sql = require('mssql')
const config = require('./db/dbConfig');
const userRouter = require('./routes/user.router');
const projectRouter = require('./routes/project.router');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware')


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = 5000

app.get('/', (req, res) => {
    res.send('changing connection')
})

sql.connect(config).then(pool => {
    if (pool.connecting) {
        console.log('Connecting to the database');
        const result = pool.request().query(`SELECT * FROM users`);
        return result
    }
    if (pool.connected) {
        console.log('Connected to SQL Server');
    }

    
})

app.use('/api/v2/users', userRouter);
app.use('/api/v2/projects', projectRouter);


app.all("*", (req, res, next) => {
    const err = new HttpException(404, 'Endpoint not found')
    next(err)
})

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is running on port ${port}`)) 