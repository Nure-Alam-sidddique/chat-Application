const express = require('express')
const router = express.Router()

const{getUsers}= require('../controller/usersController')

router.get('/', getUsers)

module.exports= router