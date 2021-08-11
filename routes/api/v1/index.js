const express = require('express')
const router = express.Router()

const ssRouter = require('./ss')
router.use('/ss', ssRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
