const express = require('express');
const crypto = require('crypto');
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

const genRandomString = (length) => crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length);

const hashSha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return value;
};

const errorWrap = (errors) => {
  const errorResp = {};
  errorResp.errors = errors;
  return errorResp;
};

const successWrap = () => {
  const successResp = {};
  successResp.success = 'Successful login';
  return successResp;
};

router.post('/signIn', (req, res, next) => {
  const token = randGen(9);

  // console.log(`${req.body.username},${req.body.password}`);

  User.find({ username: req.body.username }, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      const user = users[0];
      const hash = hashSha512(req.body.password, user.salt);
      const errors = [];

      if (hash === user.hash) {
        res
          .status(200)
          .contentType('text/json')
          .end(JSON.stringify(successWrap()));
      } else {
        errors.push('User Verification Failed!');

        res
          .status(200)
          .contentType('text/json')
          .end(JSON.stringify(errorWrap(errors)));
      }
    }
  });

  // res
  //   .status(200)
  //   .contentType('text/json')
  //   .end(`{"url": "${config.remoteUrl}","name": "accountCookie", "value": "${token}", "expirationDate": 99999999999999999999}`);
});

router.post('/register', (req, res, next) => {
  const errors = [];

  if (req.body.username.length < 2) {
    errors.push('Usernames must be at least 2 characters long');
  }

  if (!req.body.email.includes('@')) {
    errors.push('Emails must contain an @ symbol');
  }

  if (req.body.password.length < 8) {
    errors.push('Passwords must contain at least 8 characters');
  }

  if (req.body.password !== req.body.passwordConfirm) {
    errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    res.status(200)
      .contentType('text/plain')
      .end(JSON.stringify(errorWrap(errors)));
  } else {
    // User validation passed, creating user account:
    const salt = genRandomString(11);

    const hash = hashSha512(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      salt,
      hash,
    });

    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          errors.push('Username or Email is Duplicate');

          res.status(200)
            .contentType('text/json')
            .end(JSON.stringify(errorWrap(errors)));
        } else {
          errors.push('Unknown Error');

          res.status(200)
            .contentType('text/json')
            .end(JSON.stringify(errorWrap(errors)));
        }
      } else {
        const token = randGen(9);

        res.status(200)
          .contentType('text/plain')
          .end(`{"url": "${config.remoteUrl}","name": "accountCookie", "value": "${token}", "expirationDate": 99999999999999999999}`);
      }
    });
  }
});

module.exports = router;
