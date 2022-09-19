
const jwt = require('jsonwebtoken')


module.exports = (req, res, next)=>{

    const auth = req.get('authorization') 

    
   

    let token = ''

    if(auth && auth.toLowerCase().startsWith('bearer') )
    {
        token = auth.substring(7)
    }

    const decodedToken =  jwt.verify(token , process.env.SECRET)

    

    if(!token || !decodedToken.id ){
        return   res.status(400).json({
            error:'token is missing or wrong'
        })
    }

    const {id: userId} = decodedToken

    req.userId = userId

   

    next()

}