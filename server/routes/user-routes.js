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