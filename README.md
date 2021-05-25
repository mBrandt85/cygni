# Cygni Hemuppgift

Express server in the backend, fetching artist data fom MusicBrainz via api route's MBID parameters. Fetching additional data from Wikipedia and album images from CoverArtArchive.

React SPA in the frontend, served by Express in Production. Displaying results and saving search history in localStorage to avoid to many unnecessary requests, and loading time.

## Setup

### Installing dependencies

From root folder.

1. npm install
1. npm run client-install

Application will by default run on http://localhost:5000  
Change port in .env file in the root folder.

### Run development server

From root folder.

1. npm run dev

Runs concrurrently server app and client app in dev mode

### Build client bundle and start production server

From root folder.

1. npm run build
1. npm start

Runs server.  
Server app serves client bundle at /.

## API endpoints

/api/artists/:id - :id = Valid MBID

## Scalability

App runs with Node.js built in Cluster module. 

For more scalability options, setup load balancing in e.g. Nginx or PM2 (Linux). Maybe the most important, upgrade server plan.
