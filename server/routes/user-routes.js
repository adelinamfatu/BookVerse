const express = require('express');
const router = express.Router();
const { db, auth, storage } = require('../database');
const verifyToken = require('../middleware/auth');

router.post('/add', async (req, res) => {
  try {
    const id = req.body.email

    const userJson = {
      email: req.body.email,
      name: req.body.name,
      bookshelves: {}
    }

    const userResponse = await db.collection('users').doc(id).set(userJson);

    const defaultBookshelves = [
      { title: 'Want to read', isDefault: true },
      { title: 'Currently reading', isDefault: true },
      { title: 'Read', isDefault: true }
    ];

    const shelvesBatch = db.batch();

    defaultBookshelves.forEach(async (shelf, index) => {
      const shelfId = db.collection('bookshelves').doc().id;
      console.log(shelfId);

      userJson.bookshelves[shelfId] = { ...shelf, color: '#607D8B' };

      const bookshelfRef = db.collection('bookshelves').doc(shelfId);
      shelvesBatch.set(bookshelfRef, { title: shelf.title, isDefault: true });
    });

    await shelvesBatch.commit();

    const userUpdateResponse = await db.collection('users').doc(id).update({ bookshelves: userJson.bookshelves });

    res.send({ user: userResponse, userUpdate: userUpdateResponse });
  } catch(error) {
    res.send(error)
  }
});

router.get('/info', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const userDoc = await db.collection('users').doc(userEmail).get();

    if (userDoc.exists) {
      const userInfo = userDoc.data();
      const { name, profilePictureUrl } = userInfo;
      res.json({ email: userEmail, name, profilePictureUrl });
    } else {
      res.status(404).json({ error: 'User not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userDoc = await db.collection('users').doc(userEmail).get();

    if (userDoc.exists) {
      const userProfile = userDoc.data();
      res.json({
        email: userEmail,
        ...userProfile,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userDoc = await db.collection('users').doc(userEmail).get();

    if (userDoc.exists) {
      const existingUserData = userDoc.data();

      if (req.body.name) {
        existingUserData.name = req.body.name;
      }

      if (req.body.gender) {
        existingUserData.gender = req.body.gender;
      }

      if (req.body.favoriteGenres) {
        existingUserData.favoriteGenres = req.body.favoriteGenres;
      }

      await db.collection('users').doc(userEmail).set(existingUserData);

      res.json({ message: 'User data updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/picture', verifyToken, async (req, res) => {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(req.user.email);

    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    const randomYear = Math.floor(Math.random() * (2999 - 2100 + 1)) + 2100;

    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: `01-01-${randomYear}`,
    });

    const userRef = db.collection('users').doc(req.user.email);
    await userRef.update({ profilePictureUrl: signedUrl });

    res.status(200).json({ message: 'File uploaded successfully', profilePictureUrl: signedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;