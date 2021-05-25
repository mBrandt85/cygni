const router = require('express').Router()

const artist = require('./artist')

router.get('/', async (req, res) => {
  res.status(200).json({
    status: 200,
    process: process.pid,
    error: null,
    data: 'Cygni'
  })
})

router.get('/artist/:id', artist.getByID)

module.exports = router