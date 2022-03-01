const createError= require('http-errors')

// 404 page notFoundHandler
function notFoundHandler(req,res,next){
    next(createError(404, "Your requested content was not found"))
}

// default Error Handler
function errorHandler(err, req,res,next){
    
}