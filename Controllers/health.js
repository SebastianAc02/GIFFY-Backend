
const healthrouter = require('express').Router()

healthrouter.get('/', (req,res)=>{

    res.status(200).send('ok')
})

module.exports = healthrouter