const fetch = require('node-fetch')

module.exports = {
  /*
    Fetch and return JSON if OK, else return error
    uri       - Required!
    options   - optional
  */
  httpRequest: async (uri, options = {}) => {
    const opt = {
      // These properties are part of the Fetch Standard
      method: 'GET',
      headers: {},        // request headers. format is the identical to that accepted by the Headers constructor (see below)
      body: null,         // request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
      redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
      signal: null,       // pass an instance of AbortSignal to optionally abort requests
      // The following properties are node-fetch extensions
      follow: 20,         // maximum redirect count. 0 to not follow redirect
      timeout: 0,         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
      compress: true,     // support gzip/deflate content encoding. false to disable
      size: 0,            // maximum response body size in bytes. 0 to disable
      agent: null,        // http(s).Agent instance or function that returns an instance
      ...options,         // Replace any other 
    }

    try {
      const res = await fetch(uri, opt)

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