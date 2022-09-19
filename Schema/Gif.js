

const {Schema, model} = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const gifSchema = new Schema({

    gif_id : {
        type:String
    },
    url : String, 
    title: String,
    User:
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }
    

})

gifSchema.set('toJSON', {
    transform: (document, returnedObj)=>{
        returnedObj.id = returnedObj._id,

        delete returnedObj._id,
        
        delete returnedObj.__v
    }
})

gifSchema.plugin(uniqueValidator)

const Gif = model('Gif',gifSchema)



module.exports = Gif