# Cygni Hemuppgift

### Installing dependencies

From ROOT folder.

1. npm install
1. npm run client-install

Application will by default run on http://localhost:5000  
To change port open .env in ROOT folder.

### Run development server

From ROOT folder.

1. npm run dev

Runs concrurrently server app and client app in dev mode

### Build client bundle and start production server

From ROOT folder.

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
