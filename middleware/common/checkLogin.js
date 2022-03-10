const jwt= require('jsonwebtoken')

const checkLogin= (req,res,next)=>{
    let cookies= Object.keys(req.signedCookies).length > 0 ? req.signedCookies: null;
    if(cookies){
        try{
            const token= cookies[process.env.COOKIE_NAME];
            const decoded= jwt.verify(token, process.env.JWT_SECRET)
            req.user= decoded;
            if(res.locals.html){
                res.locals.loggedInUser = decoded;
            }
            next()
        }
        catch(err){
            if(res.locals.html){
                res.redirect('/')
            }
            else{
                res.status(500).json({
                    errors:{
                        common:{msg: "Authentication Failed"}
                    }
                })
            }

        }
    }
    else{
        if(res.locals.html){
            res.redirect('/')
        }
        else{
            res.status(401).json({error: "Authentication Failed"})
        }
    }
}

const redirectLogin= (req,res,next)=>{
  let cookie= Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  (!cookie) ? next: res.redirect('/inbox');
}

module.exports= {checkLogin, redirectLogin};