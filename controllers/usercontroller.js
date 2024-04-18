const Users = require('../Models/user.model').Users
const userValidator = require("../validations/user.validator");



exports.createUser = async (req,res)=>{
   
    userValidator(req,res);
    const {fullName,username,email} = req.body
    const user = await Users.findOne({ $or: [{ username }, { email }] });
 

    if(user){
       return  res.status(409).json({ message: "Failed to create new user", reason: "Already Exists in DB" })
    }
    Users.create({
        fullName:fullName,
        username:username,
        email:email,
    }).then((newuser)=>{
        console.log("New user added: ", newuser);

        res.status(200).json(newuser);
    }).catch((err)=>{
        console.log(err);
  
        res.status(500).end();
    })




   

}

exports.allUsers = (req,res) =>{

Users.find().then((data)=>{
if(data.length===0){
 return res.status(404).json({message: "No Users found"})
}
else{
return res.status(200).json(data);
}
}).catch((err)=>{
return res.status(500).end()
})



}

exports.usernameUser = async (req,res) =>{
    const username = req.params.username;
    Users.find({username:username}).then((user)=>{
        if(user.length===0){
           return res.status(404).json({ message: "User not found!", username }) 
        }
        else{
            return res.status(200).json(user)
        }
    }).catch((err)=>{
        return res.status(500).end()
    })
  
}