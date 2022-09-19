
const { Schema, model } = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        maxLength: 12,
        minLength: 6
    },
    passwordHash: String,

    gifs: [{
        type: Schema.Types.ObjectId,
        ref: 'Gif'
    }]

})

userSchema.set('toJSON', {
    transform: (document, returnedobj) => {
        returnedobj.id = returnedobj._id

        // eslint-disable-next-line no-unused-expressions, no-sequences
        delete returnedobj.__v,
        delete returnedobj._id,
        delete returnedobj.passwordHash
    }

})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
