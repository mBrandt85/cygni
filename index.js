require('dotenv').config()
const cluster = require('cluster')
const path = require('path')
const express = require('express')
const app = module.export = express()

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
  app.use('/', require('./routes'))
  app.listen(process.env.PORT)
}