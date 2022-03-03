function getInbox(req,res,next){
    res.render('inbox', {
        title: "Chat-Inbox"
    })
}

module.exports={
    getInbox,
}