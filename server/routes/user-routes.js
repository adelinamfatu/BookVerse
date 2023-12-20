const express = require('express');
const router = express.Router();
const db = require('../database');

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
});

module.exports = router;