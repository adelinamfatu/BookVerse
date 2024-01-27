const admin = require('firebase-admin');
const credentials = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: 'gs://bookverse-86b43.appspot.com'
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { db, auth, storage };