

const router = require('express').Router()

const Gif = require('../Schema/Gif')

const User = require('../Schema/Users')


router.post('/reset',async (_req, res)=>{

    await Gif.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

module.exports = router