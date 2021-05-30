const path = require('path')
const router = require('express').Router()
const api = require('./api')

// API routes
router.use('/api', api)

// Client route
router.get('/', async (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

module.exports = router