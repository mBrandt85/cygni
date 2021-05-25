# Cygni Hemuppgift

A so far simple Epxress app in the backend. 

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

nodejs.org

> A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, the user will sometimes want to launch a cluster of Node.js processes to handle the load.

For more scalability options, setup load balancing in Nginx. Upgrade server plan.
