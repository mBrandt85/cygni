# Cygni Hemuppgift

Express server in the backend, fetching artist data fom MusicBrainz via api route's MBID parameters. Fetching additional data from Wikipedia and album images from CoverArtArchive.

React SPA in the frontend, served by Express in Production. Displaying results and saving search history in localStorage to avoid to unnecessary requests.

## Setup

Application requires Node.js.  
Download latest stable verion here: **https://nodejs.org/en/download/**

### Installing dependencies

From **root** folder.

1. **npm install**
1. **npm run client-install**

### Run development server

From **root** folder.

1. **npm run dev**

Runs concrurrently server app and client app in dev mode.  
Backend: **http://localhost:5000**  
Frontend: **http://localhost:3000**  

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
