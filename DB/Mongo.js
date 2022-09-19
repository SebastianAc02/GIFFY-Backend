require('dotenv').config()

const mongoose = require('mongoose')

const connectionString =
  process.env.NODE_ENV === 'test' ? process.env.URI_TEST : process.env.URI

try {
    mongoose.connect(connectionString).then(() => {
        console.log('database connected')
    })
} catch (error) {
    console.error('error oppening db ', error)
}
