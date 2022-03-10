const express = require('express')
const router = express.Router()
const{getInbox}= require('../controller/inboxController')
const {checkLogin} = require('../middleware/common/checkLogin')
const decorateHtmlResponse= require('../middleware/common/decorateHtmlResponse')

router.get('/',decorateHtmlResponse('Inbox'),checkLogin, getInbox)

module.exports= router