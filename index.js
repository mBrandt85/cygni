require('dotenv').config()
const cluster = require('cluster')
const express = require('express')
const app = module.export = express()

// Load-balancing with Node Cluster built in magic to make singlethread into multithread.
if (cluster.isMaster) {
  console.log(`> ${process.env.HOST}:${process.env.PORT}`)
  console.log(`-> Master PID: ${process.pid}`)

  // Start 1 worker process for each CPU
  for (let i = 0; i < require('os').cpus().length; ++i) {
    cluster.fork()
  }

  // If 1 worker goes down, spawn another one
  cluster.on('exit', () => {
    cluster.fork()
  })
} else {
  console.log(`--> Worker PID: ${process.pid}`)

  // Setting up default cors
  app.use(require('cors')())

  // JSON body parsing
  app.use(express.json())

  // Include routes
  app.use('/', require('./routes'))

  // Run server
  app.listen(process.env.PORT)
}