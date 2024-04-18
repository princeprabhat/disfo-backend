const Joi = require('joi');


const discussionValidationSchema = Joi.object().keys({
    title: Joi.string().max(150).required(),
    author: Joi.string().required(),
    content: Joi.string().default(""),
    comments: Joi.array().default([])
})

const validateDiscussion = (req,res) =>{
    
   const {error} = discussionValidationSchema.validate({...req.body}) 
   console.log("Error::",error)
   
   if(error){
    return res.status(422).json(error.details)
   }
}

module.exports = validateDiscussion
