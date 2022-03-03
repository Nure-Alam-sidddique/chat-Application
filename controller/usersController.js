function getUsers(req,res,next){
    res.render('users', {
        title: "Chat-Users"
    })
}

module.exports={
    getUsers,
}