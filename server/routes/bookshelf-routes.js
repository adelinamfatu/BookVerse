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

router.post('/add', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { title, color } = req.body;

        if (!title || !color) {
            return res.status(400).send('The title, and color are required.');
        }

        const newBookshelfRef = await db.collection('bookshelves').add({
            title,
            color,
        });

        await db.collection('users').doc(userEmail).update({
            [`bookshelves.${newBookshelfRef.id}`]: {
                title,
                color,
            },
        });

        res.status(201).send(newBookshelfRef.id);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;