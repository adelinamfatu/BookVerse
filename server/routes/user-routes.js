const express = require('express');
const router = express.Router();
const { db, auth } = require('../database');
const verifyToken = require('../middleware/auth')

router.post('/register', async (req, res) => {
  try {
    const response = await auth.createUser({
      email: req.body.email,
      password: req.body.password
    });
    res.send(response);
  } catch(error) {
    res.send(error);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.getUserByEmail(email);
    const uid = userRecord.uid;
    auth.createCustomToken(uid).then((customToken) => {
      res.send(customToken);
    });
  } catch (error) {
    res.status(400).send(error.message);
  };
});

router.get('/books', verifyToken, async (req, res) => {
  try {
      const snapshot = await db.collection('books').get();
      const books = [];
      snapshot.forEach((doc) => {
          books.push(doc.data());
      });
      console.log('Tokenul a fost validat')
      res.status(200).send(books);
  } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).send('Internal Server Error');
  }
});

/*
router.post('/add', (req, res) => {
  try {
    const id = req.body.email
    const userJson = {
      email: req.body.email,
      password: req.body.password
    }
    const response = db.collection('users').doc(id).set(userJson)
    res.send(response)
  } catch(error) {
    res.send(error)
  }
});*/

module.exports = router;