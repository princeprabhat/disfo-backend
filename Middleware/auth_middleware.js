const config = require('../config/config')

const userMiddleware = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
   if(authHeader!==config.X_API_KEY){
    return res.status(403).json({message: "Unauthorised Access"});
   }
   next();

}

module.exports = userMiddleware;