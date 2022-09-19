

const bcrypt = require('bcrypt')
const userExtractor = require('../middleware/userExtractor')

const User = require('../Schema/Users')

const userRouter = require('express').Router()


userRouter.get('/', userExtractor, async (req, res) => {

    const id =  req.userId


    const user = await User.findById(id).populate('gifs', {
        gif_id:1, title:1,url:1
    })

   
    
    res.json(user)
    res.status(200)


})


userRouter.post('/', async(req, res, next)=>{

    const {username, password } = req.body

    const passwordHashed = await  bcrypt.hash(password, 10)

    const newUser = new User({
        username: username,
        passwordHash: passwordHashed,
        
    })

    try{
        const ans = await newUser.save()

        res.status(201).json(ans)

    }catch(error)
    {
        res.status(400)
        next(error)
    }




})


module.exports = userRouter