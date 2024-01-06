const express = require('express');
const router = express.Router();
const { db, auth } = require('../database');
const verifyToken = require('../middleware/auth')

router.get('/books', verifyToken, async (req, res) => {
    try {
        const snapshot = await db.collection('books').get();
        const books = [];
        snapshot.forEach((doc) => {
            books.push(doc.data());
        });
        console.log('The token was validated');
        res.status(200).send(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;