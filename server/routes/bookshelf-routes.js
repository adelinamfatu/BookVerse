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
        res.status(500).send('Internal Server Error');
    }
});

router.get('/book', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const isbn = req.query.isbn;

        const userDoc = await db.collection('users').doc(userEmail).get();
        const userBookshelves = userDoc.data().bookshelves;

        if (userBookshelves) {
            const bookshelves = [];

            for (const bookshelfId in userBookshelves) {
                const bookshelfDoc = await db.collection('bookshelves').doc(bookshelfId).get();
                
                if (bookshelfDoc.exists) {
                  const bookshelfData = bookshelfDoc.data();
                  const isSelected = bookshelfData.books && bookshelfData.books[isbn] ? true : false;
        
                  bookshelves.push({
                    id: bookshelfId,
                    title: bookshelfData.title,
                    isDefault: bookshelfData.isDefault,
                    isSelected: isSelected
                  });
                }
            }

            res.status(200).send(bookshelves);
        } else {
            res.status(200).send([]);
        }
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

        const bookshelfRef = db.collection('bookshelves').doc(bookshelfId);
        const bookshelfDoc = await bookshelfRef.get();

        if (!bookshelfDoc.exists) {
            return res.status(404).send('Bookshelf not found.');
        }

        const bookshelfData = bookshelfDoc.data();

        if (!bookshelfData.isDefault) {
            await bookshelfRef.update({
                [`books.${isbn}`]: {
                    title,
                    author,
                    coverImage
                },
            });

            res.status(201).send('Book added to the bookshelf successfully');
            return;
        }

        const batch = db.batch();

        const otherDefaultBookshelvesSnapshot = await db.collection('bookshelves').where('isDefault', '==', true).get();

        otherDefaultBookshelvesSnapshot.forEach((otherBookshelfDoc) => {
            const otherBookshelfId = otherBookshelfDoc.id;
            const otherBookshelfData = otherBookshelfDoc.data();

            if (otherBookshelfId !== bookshelfId && otherBookshelfData.books && otherBookshelfData.books[isbn]) {
                batch.update(db.collection('bookshelves').doc(otherBookshelfId), {
                    [`books.${isbn}`]: admin.firestore.FieldValue.delete(),
                });
            }
        });

        batch.update(bookshelfRef, {
            [`books.${isbn}`]: {
                title,
                author,
                coverImage
            },
        });

        await batch.commit();

        res.status(201).send('Book added to the bookshelf successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete-book/:bookshelfId/:isbn', verifyToken, async (req, res) => {
    try {
        const bookshelfId = req.params.bookshelfId;
        const isbn = req.params.isbn;

        if (!isbn) {
            return res.status(400).send('ISBN is required.');
        }

        const bookshelfDoc = await db.collection('bookshelves').doc(bookshelfId).get();
        const bookshelfData = bookshelfDoc.data();

        if (bookshelfData.books && bookshelfData.books[isbn]) {
            delete bookshelfData.books[isbn];

            await db.collection('bookshelves').doc(bookshelfId).update({
                books: bookshelfData.books,
            });

            res.status(200).send('Book deleted from the bookshelf successfully');
        } else {
            res.status(404).send('Book not found in the bookshelf');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/books/:bookshelfId', verifyToken, async (req, res) => {
    try {
        const bookshelfId = req.params.bookshelfId;

        const bookshelfDoc = await db.collection('bookshelves').doc(bookshelfId).get();

        if (bookshelfDoc.exists) {
            const bookshelfData = bookshelfDoc.data();
            const books = bookshelfData.books || {};

            const bookList = Object.keys(books).map(isbn => ({
                isbn,
                title: books[isbn].title,
                author: books[isbn].author,
                coverImage: books[isbn].coverImage,
            }));

            const response = {
                title: bookshelfData.title,
                isDefault: bookshelfData.isDefault,
                books: bookList,
            };

            res.status(200).send(response);
        } else {
            res.status(404).send('Bookshelf not found.');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;