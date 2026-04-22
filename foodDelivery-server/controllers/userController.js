const crypto = require("crypto");
const User = require("../models/User")
// Get all Users
const getallUsers = async(req,res)=>{
       try{
        
            const users = await User.find({})
            res.status(200).json(users)

       }catch(error){
          return res.status(500).json({message:error.message})
       }
}

// Post user to the database
const createUser = async(req,res)=>{
     try{
           const user = req.body;
           const query = {email:user.email}

           const existingUser = await User.findOne(query)

           if(existingUser){
            return res.status(302).json({
                message:"User already exists"
            })
           }
           const result = await User.create(user)
           return res.status(200).json(result)
     
        }
     catch(error){
         return res.status(500).json({message:error.message})
     }
}

// delete user from the database
const deleteUser = async(req,res)=>{
    try{
         const userId = req.params.id
         const responce =  await User.findByIdAndDelete(userId)
         if(!responce){
            return res.status(404).json({message:"User Not Found"})
         }
            return res.status(200).json({message:"User Deleted Successfully"})
    }
    catch(error){
       return res.status(500).json({message:error.message})
    }
}

// get Admin
const getAdmin = async(req,res)=>{
    try{
        const email = req.params.email
        const query = { email:email }

        const user = await User.findOne(query)
        console.log(user)
        
        if(email !== req.decoded.email){
            return res.status(403).json({messaage:"Forbidden Access"})
        }

        let admin = false;

        if(user){
            admin = user?.role === "admin"
        }
        
        return res.status(200).json({admin})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

// create User admin

const makeAdmin = async(req,res)=>{
       try{
             const userId = req.params.id

             const {name,email,photoUrl,role} = req.body

             const  updatedUser = await User.findByIdAndUpdate(userId,

                {role:"admin"},
                {new:true,runValidators:true})

            if(!updatedUser){
                return res.status(404).json({message:"User Not Found"})
            }

            return res.status(200).json(updatedUser)

       }
       catch(error){
            return res.status(500).json({message:error.message})
       }

}

module.exports = {getallUsers,createUser,deleteUser,getAdmin,makeAdmin}