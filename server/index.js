const express = require('express');
const server = express();
const port = 6000;

const admin = require('firebase-admin');
const credentials = require('./key.json');

admin.initializeApp({credential: admin.credential.cert(credentials)});

const db = admin.firestore();

server.use(express.json());
server.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`);
});