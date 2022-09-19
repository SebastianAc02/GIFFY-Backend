

const ObjectId = require('mongoose').Types.ObjectId
const gifRouter = require('express').Router()
const Gif = require('../Schema/Gif')
const User = require('../Schema/Users')


const userExtractor = require('../middleware/userExtractor') 



gifRouter.get('/',userExtractor, async (req, res, next)=>{

    const {userId} = req

    try{
        const gifs = await Gif.find({User:ObjectId(userId)})

        res.status(200).json(gifs)
    }
    catch(error)
    {
        next(error)
    }
})

gifRouter.post('/' ,userExtractor,async (req, res, next)=>{

    const gif = req.body



    const {userId} = req

    const user = await User.findById(userId)



    const newGif = new Gif({
        gif_id: gif.gif_id,
        url: gif.url,
        title: gif.title,
        User: userId
    })

    

    try{
     
        const ans =  await newGif.save()
  
        // acutalizar el array del usuario de gifs
        user.gifs = user.gifs.concat(ans._id)

        await user.save()



        res.status(200).json(ans)
    }catch(error){
        res.status(400)

        next(error)
    }



})

gifRouter.delete('/:id',userExtractor, async(req,res)=>{
  
    const {id} = req.params


    const {userId} = req
   



    try{
        await Gif.findOneAndDelete({gif_id : id , User:ObjectId(userId)})

     

     

        res.status(200).end()
    }catch(error){
        res.status(400).end()
    }



})

module.exports = gifRouter