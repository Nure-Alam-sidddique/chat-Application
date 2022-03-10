const express = require('express')
const router = express.Router()
const{getUsers, addUser, removeUser}= require('../controller/usersController')
const decorateHtmlResponse= require('../middleware/common/decorateHtmlResponse')
const avaterUpload = require('../middleware/users/avaterUpload')
const {checkLogin}= require('../middleware/common/checkLogin')
const { addUsersValidators, addUserValidationsHandler } = require('../middleware/users/usersValidators')

router.get('/',decorateHtmlResponse('Users'),checkLogin, getUsers)

router.post('/', checkLogin, avaterUpload, addUsersValidators, addUserValidationsHandler, addUser)

router.delete('/:id', removeUser)

module.exports= router