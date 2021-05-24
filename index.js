require('dotenv').config()
const cluster = require('cluster')
const path = require('path')
const express = require('express')
const app = express()

if (cluster.isMaster) {
  console.log(`Master PID: ${process.pid}`)
  for (let i = 0; i < require('os').cpus().length; ++i) {
    cluster.fork()
  }
} else {
  console.log(`Worker PID: ${process.pid}`)
  app.use(require('cors')())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use('/api', require('./routes'))

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))
  }

  app.listen(process.env.PORT)
}