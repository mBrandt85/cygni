const expect = require('chai').expect
const {
  getMusicBrainzById,
  getWikidataById,
  getWikipediaById,
  getCoverArtArchiveById
} = require('../lib/api-data')

describe('/lib/api-data.js', () => {
  it('getCoverArtArchiveById("f1afec0b-26dd-3db5-9aa1-c91229a74a24") expect { data > images }', async () => {
    // Nirvana album Bleach "f1afec0b-26dd-3db5-9aa1-c91229a74a24"
    const id = 'f1afec0b-26dd-3db5-9aa1-c91229a74a24'
    const res = await getCoverArtArchiveById(id) 
    expect(res.data.images).to.be.ok
  })

  it('getCoverArtArchiveById("inval-id") expect { error }', async () => {
    const res = await getCoverArtArchiveById('inval-id') 
    expect(res.error).to.be.ok
  })

  it('getMusicBrainzById("5b11f4ce-a62d-471e-81fc-a69a8278c7da") expect id to equal { data > id }', async () => {
    // With valid MusicBrainz ID
    // Nirvana: "5b11f4ce-a62d-471e-81fc-a69a8278c7da" 
    const id = '5b11f4ce-a62d-471e-81fc-a69a8278c7da'
    const res = await getMusicBrainzById(id)
    expect(res.data.id).to.equal(id)
  })

  it('getMusicBrainzById("inval-id") expect to return { error }', async () => {
    const res = await getMusicBrainzById('inval-id')
    expect(res.error).to.be.ok
  })

  it('getWikidataById("Q11649") expect id to equal Object.key { data > entities > Q11649 }', async () => {
    // With valid Wikidata ID
    // Nirvana: "Q11649"
    const id = 'Q11649'
    const res = await getWikidataById(id)
    expect(res.data.entities).to.have.keys(id)
  })

  it('getWikidataById("inval-id") expect to return { data > error }', async () => {
    // Return status 200
    const res = await getWikidataById('inval-id')
    expect(res.error).to.be.ok
  })

  it('getWikipediaById("21231") expect { data > query > pages > "21231" > ... }', async () => {
    // With valid URL Encoded Wikipedia ID
    // Nirvana EN site: "Nirvana%20(band)"
    // Return object with key "21231"
    const res = await getWikipediaById('Nirvana%20(band)')
    expect(res.data.query.pages).to.have.keys('21231')
  })

  it('getWikipediaById("inval-id") expect { data > query > pages > "-1" > ... }', async () => {
    // Return status 200
    const res = await getWikipediaById('inval-id')
    expect(res.error).to.be.ok
  })
})