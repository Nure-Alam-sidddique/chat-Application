const User = require('../model/People');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken');
const createError = require('http-errors');

function getLogin(req,res,next){
    res.render('index')
}

async function login(req,res,next){
    try{
       const user= await User.findOne({
           $or:[{email: req.body.username}, {mobile:req.body.username}]
       });
       if(user && user._id){
           const isValidPassword= await bcrypt.compare(req.body.password, user.password);
           if(isValidPassword){
            //    token Generate
            const userObject= {
                username: user.name,
                mobile: user.mobile,
                email: user.email,
                role: "user"
            }
             const token= jwt.sign(userObject, process.env.JWT_SECRET, {
                 expiresIn: process.env.JWT_EXPIRY
             })

            //  set cookie
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.JWT_EXPIRY,
                httpOnly: true,
                signed: true
            })
            res.locals.loggedInUser= userObject;
            res.render('inbox')

           }
           else{
               throw createError("Login Failed ! Please Try again")
           }
        }
       else{
           throw createError("Login Failed! Please Try again")
       }
    }
    catch(err){
     res.render('index', {
         data:{
             username: req.body.username
         },
         errors: {
             common:{
                 msg: err.message
             }
         }
     })
    }
}

function logout(req,res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged Out")
}
module.exports={
    getLogin,
    login,
    logout
}