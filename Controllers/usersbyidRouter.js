// const userExtractor = require('../middleware/userExtractor')
const User = require('../Schema/Users')
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const Gif = require('../Schema/Gif')

const userByIdRouter = require('express').Router()

userByIdRouter.get('/:id', async (request, res, next) => {
    const id = request.params.id

    // revisar que funcione todo bien

    try {
        const user = await User.findById(id).populate('gifs', {
            gif_id: 1, url: 1, title: 1
        })

        if (user) res.json(user)
        else next()
    } catch (error) {
        next(error)
    }
})

userByIdRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await Gif.deleteMany({ User: ObjectId(id) })
        await User.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        res.status(400)
    }
})

userByIdRouter.put('/:id', async (req, res, next) => {
    const { id } = req.params

    const { username, password } = req.body

    const objUpdating = {

        username, passwordHash: password
    }

    if (objUpdating.passwordHash) {
        objUpdating.passwordHash = await bcrypt.hash(password, 10)
    }

    try {
        const ans = await User.findByIdAndUpdate(id, objUpdating, { new: true }
        )

        res.json(ans)
    } catch (error) {
        next(error)
    }
})

module.exports = userByIdRouter
