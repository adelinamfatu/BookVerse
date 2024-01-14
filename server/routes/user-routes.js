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
    const response = db.collection('users').doc(id).set(userJson)
    res.send(response)
  } catch(error) {
    res.send(error)
  }
});

module.exports = router;