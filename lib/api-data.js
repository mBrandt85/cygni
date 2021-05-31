const { httpRequest } = require('./handlers')

// Return { data } or { error }
const getCoverArtArchiveById = async (id, attempts = 0) => {
  // Fetch Cover image with ID
  const uri = `http://coverartarchive.org/release-group/${id}`
  let cover = await httpRequest(uri)
  
  // Check error and attempt again (max 3 times)
  if (cover.error) {
    // If status is not 404 try to fetch image again, inc attempts by +1, max 3 attempts
    if (cover.error.status !== 404 && attempts !== 3) cover = await getCoverArtArchiveById(id, ++attempts)

    // If error persists, return error
    if (cover.error) return { error: cover.error }
  }

  return { data: cover.data }
}

// Return { data } or { error }
const getMusicBrainzById = async id => {
  // Fetch artist data with MBID from MusicBrainz API
  const uri = `http://musicbrainz.org/ws/2/artist/${id}?&fmt=json&inc=url-rels+release-groups`
  const options = {
    headers: {
      'User-Agent': 'BackendMashup/1.0.0 (magnusbrandt85@gmail.com)'
    }
  }
  const { data, error } = await httpRequest(uri, options)

  if (error) return { error }

  return { data }
}

// Return { data } or { error }
const getWikidataById = async id => {
  // Fetch Wikidata with ID
  const uri = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&props=sitelinks`
  const { data, error } = await httpRequest(uri)

  if (error) return { error }

  // Error from Wikidata is status 200 { data > error }
  if (data.error) return { error: data.error }

  return { data }
}

// Return { data } or { error }
const getWikipediaById = async id => {
  // Fetch Wikipedia with ID
  const uri = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${id}`
  const { data, error } = await httpRequest(uri)

  if (error) return { error }

  // Error from Wikipedia is status 200 { dara > query > pages > "-1" }
  if (data.query.pages['-1']) return {
    error: {
      status: 404,
      statusText: 'Not Found',
      url: uri
    }
  }

  return { data }
}

module.exports = {
  getCoverArtArchiveById,
  getMusicBrainzById,
  getWikidataById,
  getWikipediaById
}