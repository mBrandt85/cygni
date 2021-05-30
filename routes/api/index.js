const router = require('express').Router()
const artist = require('./artist')

// Displays status 200, current worker and name
// Used for test
router.get('/', async (req, res) => res.status(200).json({
  status: 200,
  pid: process.pid,
  project: 'Backend Mashup'
}))

// Get artist JSON by MBID
router.get('/artist/:id', artist.getById)

module.exports = router