const router = require('express').Router()

const artist = require('./artist')

router.get('/', async (req, res) => {
  res.status(200).json({
    hello: "World!",
    process: process.pid
  })
})

router.get('/artist/:id', artist.getByID)

module.exports = router