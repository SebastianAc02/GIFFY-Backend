
const jwt = require('jsonwebtoken')

const User = require('../Schema/Users')

const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    console.log(req.body)

    const user = await User.findOne({ username })

    console.log('cypress enter in logn ')

    const passwordCorrect =
    user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if ((!user || !passwordCorrect)) {
        return res.status(401).json({
            error: 'password or username incorrect'
        })
    }

    const userobj = {

        id: user._id,
        username: user.username
    }

    const token = jwt.sign(userobj, process.env.SECRET)

    res.send({

        username: user.username,
        token
    })
})

module.exports = loginRouter
