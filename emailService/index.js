const express = require('express')
const cron = require('node-cron')
const config =require('./config')
const app = express()
const regTask = require('./tasks/emails/registration')

const run = async() => {
    cron.schedule('*/10 * * * * *', async () => {
        await regTask();
    })
}

run()


app.get('/task/health', (req, res) => {
    res.send({okay: true})
})


const PORT = config.port
app.listen(PORT, () =>console.log(`Service running on port ${PORT}`))