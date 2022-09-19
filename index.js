
require('./DB/Mongo')

const mongoose = require('mongoose')

const express = require('express')
const cors = require('cors')

const app = express()

const userRouter = require('./Controllers/usersRouter')
const userByIdRouter = require('./Controllers/usersbyidRouter')
const gifRouter = require('./Controllers/gifRouter')
const loginRouter = require('./Controllers/loginRouter.js')

const HandleErrors = require('./middleware/errorHandling')
const NotFound = require('./middleware/notFound')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>DATABASE FOR GIFFY APP BY Sebastian Acosta </h1>')
})

app.use('/db/users', userRouter)
app.use('/db/users', userByIdRouter)
app.use('/db/gifs', gifRouter)
app.use('/db/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./Controllers/testing')

    app.use('/api/testing', testingRouter)
}

app.use(HandleErrors)
app.use(NotFound)

const port = process.env.port || 4003

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

process.on('uncaughtException', (error) => {
    console.error(error)
    console.log('Closing database after an Uncaught Exception')
    mongoose.disconnect()
})

module.exports = { app, server }
