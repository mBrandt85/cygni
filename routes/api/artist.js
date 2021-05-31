const {
  getCoverArtArchiveById,
  getMusicBrainzById,
  getWikidataById,
  getWikipediaById
} = require('../../lib/api-data')

module.exports = {
  // Return { mbid, name, description, albums } or error
  getById: async ({ params: { id }}, res) => {
     // Fetch artist JSON data from MusicBrainz with MBID
    const artist = await getMusicBrainzById(id)
    if (artist.error) return res.status(artist.error.status).json({ ...artist.error })

    // Get Wikidata ID from MusicBrainz object
    const wikidataId = artist.data.relations.filter(({ type }) => type === 'wikidata')[0].url.resource.split('/').pop()

    // Get Wikidata from MusicBrainz object
    const wikidata = await getWikidataById(wikidataId)

    // Set description to null as default, overwrite if Wikipedia fetch is successful
    let description = null

    // Get description from Wikipedia if Wikidata fetch is successful
    if (!wikidata.data.error) {
      // Grab Wikipedia ID (EN) from Wikidata and URI encode it
      const wikipediaId = encodeURI(wikidata.data.entities[wikidataId].sitelinks.enwiki.title)
      
      // Get Wikipedia description with Wikipedia ID
      const wikipedia = await getWikipediaById(wikipediaId)

      // If data returned, assign description
      if (wikipedia.data) description = wikipedia.data.query.pages[Object.keys(wikipedia.data.query.pages)[0]].extract
    }

    // Get albums array, fetch album cover url from Cover Art Archive for each album asynchronously with Promise.all method.
    const albums = await Promise.all(artist.data['release-groups']
      // Filter out all "primary-type" is equal to "Album"
      .filter(({ ['primary-type']: type }) => type === 'Album')
      // Sort  array in ASC by first-release-date
      .sort((a, b) => new Date(a['first-release-date']).toISOString() > new Date(b['first-release-date']).toISOString() ? 1 : -1)
      // Map each album
      .map(async ({ id, title }) => {
        // Fallback value if fetching fails
        let image = null

        // Fetching Front album cover url from Cover Art Archive
        // { error } is available if image url not fetched, null is fallback value
        const { data } = await getCoverArtArchiveById(id)
        if (data) {
          const images = data.images.filter(({ front }) => front)
          image = images[0] && images[0].image
        }

        return {
          id,
          title,
          image
        }
      })
    )

    // JSON response
    res.status(200).json({
      mbid: id,
      name: artist.data.name,
      description,
      albums
    })
  }
}