const express = require('express');
const router = express.Router();
const { db, auth } = require('../database');
const verifyToken = require('../middleware/auth');

router.get('/all', verifyToken, async (req, res) => {
    try {
        const snapshot = await db.collection('bookshelves').get();
        const bookshelves = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            bookshelves.push({
                name: data.name,
                color: data.color,
            });
        });
        
        res.status(200).send(bookshelves);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;