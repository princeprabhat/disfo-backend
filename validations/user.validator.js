const Joi = require('joi');


const userValidationSchema = Joi.object().keys({
    fullName: Joi.string().max(50).default(''),
    username: Joi.string().max(25).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

const validateUser = (req,res) =>{
    const {fullName,username,email} = req.body
   const {error} = userValidationSchema.validate({fullName,username,email}) 
   console.log("Error::",error)
   
   if(error){
    return res.status(422).json(error.details)
   }
}

module.exports = validateUser
