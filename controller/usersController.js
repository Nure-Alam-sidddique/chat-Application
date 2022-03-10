const bcrypt= require('bcrypt')
const User= require('../model/People')
const {unlink}= require('fs');
const path = require('path');

async function getUsers(req,res,next){
    try{
        const users= await User.find({})
        res.render('users', {
            users: users,
        })
    }
    catch(err){
        next(err)
    }
    
}

// add user 
 async function addUser(req,res,next){
   let newUser;
   const hashPassword= await bcrypt.hash(req.body.password, 10);
   if(req.files && req.files.length>0){
       newUser= new User({
           ...req.body,
           avatar: req.files[0].filename,
           password: hashPassword
       })
   }
   else{
       newUser= new User({
           ...req.body,
           password: hashPassword
       })
   }
   try{
       await newUser.save();
       res.status(200).json({message: "User has added Successfully"})
   }
   catch(err){
     res.status(500).json({
         errors:{
             common: {
                 msg: "Unkwon Error occured"
             }
         }
     })
   }
 }
 async function removeUser(req,res,next){
     try{
         const user = await User.findByIdAndDelete({_id:req.params.id});
         if(user.avatar){
             unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
             (err)=>{
               if(err) console.log(err);
             });
         }
         res.status(200).json({mssage: "User was remove successfully"})
     }
     catch(err){
         res.status(500).json({
             errors:{
                 common:{msg: "Could not delete the user"}
             }
         })

     }
 }
module.exports={
    getUsers,
    addUser,
    removeUser
}