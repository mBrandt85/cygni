# Cygni Hemuppgift

Express server fetching artist data from CoverArtArchive, MusicBrainz, Wikidata and Wipipedia.

## Setup

Application requires Node.js.  
Download latest stable verion here: **https://nodejs.org/en/download/**

### .env

PORT = 3000  
HOST = "http://localhost"

#### Installing dependencies

`npm install`

#### Run development server (live-reload)

`npm run dev`

Server runs at **http://localhost:3000** (as default)

#### Run unit tests

`npm run test`

*Server needs to run for testing!*

#### Start production server

`npm start`

Server runs at **http://localhost:3000** (as default)

## API endpoints

**http://localhost:3000/api/artist/:id** (**:id** = Valid MBID!)

Nirvana Example:  
**http://localhost:3000/api/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da**

## Scalability

App runs with Node.js built in Cluster module. 

For more scalability options, setup PM2 load balancing and/or horizontal scaling in Nginx. Maybe the most important, upgrade server plan.
