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
