const express = require('express');
const router = express.Router();
const { db, auth } = require('../database');
const verifyToken = require('../middleware/auth');
const admin = require('firebase-admin');

router.get('/all', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('books').get();
    const books = [];
    
    snapshot.forEach((doc) => {
      const { title, coverImage, author } = doc.data();
      const isbn = doc.id;
      books.push({ isbn, title, coverImage, author });
    });
    
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/details/:isbn', verifyToken, async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const userEmail = req.user.email;
    const docRef = db.collection('books').doc(isbn);
    const snapshot = await docRef.get();
    
    if (!snapshot.exists) {
      return res.status(404).send('Book not found');
    }
    
    const bookData = snapshot.data();
    const isFavorite = bookData.favoritedBy ? bookData.favoritedBy.includes(userEmail) : false;
    
    const responseData = {
      ...bookData,
      isFavorite: isFavorite,
    };

    res.status(200).send(responseData);
    
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/favorites/add/:isbn', verifyToken, async (req, res) => {
  try {
    const { isbn } = req.params;
    const userEmail = req.user.email;
    if (!isbn || !userEmail) {
      return res.status(400).json({ error: 'ISBN and userEmail are required' });
    }
    
    const bookRef = db.collection('books').doc(isbn);
    const bookDoc = await bookRef.get();
    if (!bookDoc.exists) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await bookRef.update({
      favoritedBy: admin.firestore.FieldValue.arrayUnion(userEmail),
    });
    return res.json({ message: 'Favorite updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/favorites/remove/:isbn', verifyToken, async (req, res) => {
  try {
    const { isbn } = req.params;
    const userEmail = req.user.email;

    if (!isbn || !userEmail) {
      return res.status(400).json({ error: 'ISBN and userEmail are required' });
    }

    const bookRef = db.collection('books').doc(isbn);
    const bookDoc = await bookRef.get();

    if (!bookDoc.exists) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await bookRef.update({
      favoritedBy: admin.firestore.FieldValue.arrayRemove(userEmail),
    });

    return res.json({ message: 'User removed from favorites successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;