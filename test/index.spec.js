require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)
const request = chai.request(`${process.env.HOST}:${process.env.PORT}`)

describe('/index.js', () => {
  it('GET /api', () => {
    request
      .get('/api')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
      })
  })

  // Get Nirvana "5b11f4ce-a62d-471e-81fc-a69a8278c7da"
  it('GET /api/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da', () => {
    request
      .get('/api/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.keys(['mbid', 'name', 'description', 'albums'])
      })
  })
})