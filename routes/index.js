const path = require('path')
const router = require('express').Router()
const api = require('./api')

// API routes
router.use('/api', api)

module.exports = router