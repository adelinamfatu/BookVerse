const express = require('express');
const router = express.Router();
const { db, auth } = require('../database');
const verifyToken = require('../middleware/auth');
const admin = require('firebase-admin');

router.get('/user', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email;

        const userDoc = await db.collection('users').doc(userEmail).get();
        const userBookshelves = userDoc.data().bookshelves;

        if (userBookshelves) {
            const bookshelves = [];

            for (const bookshelfId in userBookshelves) {
                const bookshelfData = userBookshelves[bookshelfId];

                bookshelves.push({
                    id: bookshelfId,  
                    title: bookshelfData.title,
                    color: bookshelfData.color,
                    isDefault: bookshelfData.isDefault
                });
            }

            res.status(200).send(bookshelves);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        console.error(error);
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
            isDefault : false,
        });

        await db.collection('users').doc(userEmail).update({
            [`bookshelves.${newBookshelfRef.id}`]: {
                title,
                color,
                isDefault : false,
            },
        });

        res.status(201).send(newBookshelfRef.id);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/update/:bookshelfId', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const bookshelfId = req.params.bookshelfId;

        const { title, color } = req.body;

        await db.collection('users').doc(userEmail).update({
            [`bookshelves.${bookshelfId}.title`]: title,
            [`bookshelves.${bookshelfId}.color`]: color,
        });

        await db.collection('bookshelves').doc(bookshelfId).update({
            title,
            color,
        });

        res.status(200).send('Bookshelf updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete/:bookshelfId', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const bookshelfId = req.params.bookshelfId;

        await db.collection('users').doc(userEmail).update({
            [`bookshelves.${bookshelfId}`]: admin.firestore.FieldValue.delete(),
        });

        await db.collection('bookshelves').doc(bookshelfId).delete();

        res.status(200).send('Bookshelf deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add-book/:bookshelfId', verifyToken, async (req, res) => {
    try {
        const bookshelfId = req.params.bookshelfId;
        const { isbn, title, author, coverImage } = req.body;

        if (!isbn || !title || !author || !coverImage) {
            return res.status(400).send('Book details are required.');
        }

        await db.collection('bookshelves').doc(bookshelfId).update({
            [`books.${isbn}`]: {
                title,
                author,
                coverImage
            },
        });

        res.status(201).send('Book added to the bookshelf successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;