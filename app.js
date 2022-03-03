const express= require('express')
const mongoose= require('mongoose')
const path= require('path')
const dotenv= require('dotenv');
const cookieParser = require('cookie-parser');
const {notFoundHandler, errorHandler}= require('./middleware/common/errorHandler')

const loginRouter= require('./router/loginRouter')
const usersRouter= require('./router/usersRouter')
const inboxRouter= require('./router/inboxRouter') 
dotenv.config();
const app = express()

// Mongoose connect
mongoose.connect(process.env.MONGODB_CONNECT_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Database Connection Successfully"))
.catch((err)=>console.log(err.message));

// request Procee
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// view engine
app.set("view engine", "ejs")

// set Static folder
app.use(express.static(path.join(__dirname, "public")))

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET))

// router setup
app.use('/', loginRouter)
app.use('/users', usersRouter)
app.use('/inbox', inboxRouter)

// Not found Handler
app.use(notFoundHandler)

// error Handler
 app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Chat Application listening to port ${process.env.PORT}`)
})