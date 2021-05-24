const fetch = require('node-fetch')

module.exports = {
  getByID: async ({ params: { id }}, res) => {
    try {
      const mbDataRes = await fetch(`http://musicbrainz.org/ws/2/artist/${id}?&fmt=json&inc=url-rels+release-groups`, {
        'User-Agent': 'BackendMashup/1.0.0 (magnusbrandt85@gmail.com)'
      })
      if (mbDataRes.status !== 200) throw new Error('Invalid MBID')
      const mbData = await mbDataRes.json()
      
      const wikipedia = mbData.relations.filter(({ type }) => type === 'wikipedia')
      wikipedia.length > 0 && console.log(wikipedia)

      const wdID = mbData.relations.filter(({ type }) => type === 'wikidata')[0].url.resource.split('/').pop()
      const officialHomepage = mbData.relations.filter(({ type }) => type === 'official homepage')

      const albums = await Promise.all(mbData['release-groups'].filter(({ ['primary-type']: type }) => type === 'Album').map(async ({ id, title, ['first-release-date']: releaseDate }) => {
        try {
          let image
          const imageRes = await fetch(`http://coverartarchive.org/release-group/${id}`)
          if (imageRes.status === 200) {
            const imageData = await imageRes.json()
            image = imageData && imageData.images[0].image
          } else {
            image = null
          }

          return {
            id,
            title,
            releaseDate,
            image
          }
        } catch (error) {
          throw new Error(error)
        }
      }))

      const wdDataRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wdID}&format=json&props=sitelinks`)
      const wdData = await wdDataRes.json()
      const wdDataID = encodeURI(wdData.entities[wdID].sitelinks.enwiki.title)

      const wpDataRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${wdDataID}`)
      const wpData = await wpDataRes.json()

      const description = wpData.query.pages[Object.keys(wpData.query.pages)[0]].extract

      let result = {
        mbid: id,
        name: mbData.name,
        country: mbData.country,
        officialHomepage: officialHomepage.length > 0 ? officialHomepage[0].url.resource : null,
        wikipediaHomepage: `https://en.wikipedia.org/wiki/${wdDataID}`,
        description,
        lifeSpan: {
          begin: mbData['life-span'].begin ? mbData['life-span'].begin : null,
          end: mbData['life-span'].end ? mbData['life-span'].end : null,
          ended: mbData['life-span'].ended
        },
        albums
      }      
  
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(400).json(error.message)
    }
  }
}