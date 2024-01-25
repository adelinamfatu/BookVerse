const express = require('express');
const router = express.Router();
const { db, auth } = require('../database');
const verifyToken = require('../middleware/auth');

router.post('/add', (req, res) => {
  try {
    const id = req.body.email

    const userJson = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }

    const response = db.collection('users').doc(id).set(userJson);
    
    res.send(response)
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
      const { name, profilePicture } = userInfo;
      res.json({ name, profilePicture });
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

module.exports = router;