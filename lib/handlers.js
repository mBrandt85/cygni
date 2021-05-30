const fetch = require('node-fetch')

module.exports = {
  /*
    Fetch and return JSON if OK, else return error
    uri       - Required!
    options   - optional
  */
  httpRequest: async (uri, options = {}) => {
    try {
      const res = await fetch(uri, options)

      // Check error
      if (res.status !== 200) {
        throw {
          status: res.status,
          statusText: res.statusText,
          url: res.url
        }
      } else {
        // Return JSON
        const data = await res.json()
        return { data }
      }
    } catch (error) {
      return { error }
    }
  }
}