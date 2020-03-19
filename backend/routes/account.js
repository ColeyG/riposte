const express = require('express');
const config = require('../config/config.json');
const User = require('../models/User');

const router = express.Router();

const randGen = (length) => {
  const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resp = '';
  for (let i = 0; i < length; i++) {
    resp += set.charAt(Math.floor(Math.random() * set.length));
  }
  return resp;
};

router.get('/signIn', (req, res, next) => {
  const token = randGen(9);

  res
    .status(200)
    .contentType('text/json')
    .end(`{"url": "${config.remoteUrl}","name": "accountCookie", "value": "${token}", "expirationDate": 99999999999999999999}`);
});

router.post('/register', (req, res, next) => {
  const errors = [];

  console.log(`${req.body.password}, ${req.body.passwordConfirm}`);

  if (req.body.username.length < 2) {
    errors.push(' Usernames must be at least 2 characters long');
  }

  if (!req.body.email.includes('@')) {
    errors.push(' Emails must contain an @ symbol');
  }

  if (req.body.password.length < 8) {
    errors.push(' Passwords must contain at least 8 characters');
  }

  if (req.body.password !== req.body.passwordConfirm) {
    errors.push(' Passwords do not match');
  }

  if (errors.length > 0) {
    res.status(200)
      .contentType('text/plain')
      .end(`Error(s):${errors}`);
  } else {
    // User validation passed, creating user account:
    // TODO: Hash & Salt the pws
    const user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });

    user.save(() => {
      // TODO: Return a token to be saved in the cache here
      res.status(200)
        .contentType('text/plain')
        .end(`username: ${req.body.username}, email: ${req.body.email}`);
    });
  }
});

module.exports = router;
