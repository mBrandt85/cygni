# Cygni Hemuppgift

Express server fetching artist data from CoverArtArchive, MusicBrainz, Wikidata and Wipipedia.

## Setup

Application requires Node.js.  
Download latest stable verion here: **https://nodejs.org/en/download/**

### .env

PORT = 3000  
HOST = "http://localhost"

### Installing dependencies

In **/**

`npm install`

### Run development server

In **/** folder.

1. **npm run dev**

Server runs at **http://localhost:3000** (as default)

### Build client bundle and start production server

From **root** folder.

1. **npm run build**
1. **npm start**

Runs server.  
Server app serves client bundle at **http://localhost:5000**.

## API endpoints

**http://localhost:5000/api/artist/:id** (**:id** = Valid MBID!)

## Scalability

App runs with Node.js built in Cluster module. 

For more scalability options, setup load balancing in e.g. Nginx or PM2 (Linux). Maybe the most important, upgrade server plan.
