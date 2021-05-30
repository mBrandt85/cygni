require('dotenv').config()
const expect = require('chai').expect
const { httpRequest, httpResponse } = require('../lib/handlers')

const host = `${process.env.HOST}:${process.env.PORT}`

describe('/lib/handlers.js', () => {
  it(`httpRequest("${host}/api") expect to return { data > status, pid, project }`, async () => {
    // Endpoint to this API for dummy data object
    const res = await httpRequest(`${host}/api`)
    expect(res.data).to.have.keys(['status', 'pid', 'project'])
  })

  it(`httpRequest("${host}/invalid-params") expect to return { error }`, async () => {
    // Endpoint to this API for dummy data object
    const res = await httpRequest(`${host}/api/invalid-endpoint`)
    expect(res.error).to.be.ok
  })
})