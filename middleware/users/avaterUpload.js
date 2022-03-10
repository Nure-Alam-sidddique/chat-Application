const uploder= require('../../utilites/singleUploder')
function avaterUpload(req,res,next){
const upload= uploder(
    "avatars",
    ["image/jpeg","image/jpg", "image/png"],
    1000000,
    "Only .jpeg, .jpg or .png format allowed"
)
upload.any()(req,res,(err)=>{
    if(err){
        res.status(500).json({
            errors:{
                avatar:{msg:err.message}
            }
        })
    }
    else{
        next()
    }
})
}

module.exports= avaterUpload