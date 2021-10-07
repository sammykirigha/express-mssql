const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const cors = require('cors')
const config = require('./config');

//Import Routes
const projectRouter = require('./routes/projects');
const HttpException = require('./utills/httpException');
const errorMiddleware = require('./middleware/errorMiddleware')


app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/v2/projects', projectRouter);

//middleware
app.use(errorMiddleware);
app.all("*", (req, res, next) => {
    const err = new HttpException(404, 'Endpoint not found')
    next(err)
})


app.get('/', (req, res) => {
    res.send({status: "Ok", message: "Welcome to API"})
})


const PORT = config.port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}......`)) 