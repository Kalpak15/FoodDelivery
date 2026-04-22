const jwt  = require('jsonwebtoken')


const verifytoken=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({message:"Unauthorized Access"})
    }    
    
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,decoded)=>{
        if(error){
            return res.status(401).json({message:"Token is Invalid"})
        }
        else{
            req.decoded= decoded
            next()
        }
    })
}

module.exports = verifytoken