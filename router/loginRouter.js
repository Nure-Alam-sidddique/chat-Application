const express = require('express')
const router = express.Router()
const{getLogin, login, logout}= require('../controller/loginController')
const { redirectLogin } = require('../middleware/common/checkLogin')
const decorateHtmlResponse= require("../middleware/common/decorateHtmlResponse")
const { doLoginValidators, doLoginValidationHandler } = require('../middleware/login/loginValidation')
const page_title= "Login"
router.get('/',decorateHtmlResponse(page_title), redirectLogin, getLogin)

router.post(
    '/', 
    decorateHtmlResponse(page_title), 
    doLoginValidators,
    doLoginValidationHandler,
    login )
    
router.delete('/', logout)

module.exports= router