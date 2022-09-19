
require('dotenv').config()

const mongoose = require('mongoose')







try{

    if(process.env.NODE_ENV === 'test')
        mongoose.connect(process.env.URI_TEST)
    else
        mongoose.connect(process.env.URI)
    console.log('database connected')

}catch(error)
{
    console.error('error oppening db ', error )
}
   



