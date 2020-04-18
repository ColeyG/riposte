/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const crypto = require('crypto');
const config = require('../config/config.json');
const User = require('../models/User');
const Token = require('../models/Tokens');

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

router.post('/signIn', (req, res, next) => {
  User.find({ username: req.body.username }, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      const user = users[0];
      const hash = hashSha512(req.body.password, user.salt);
      const errors = [];

      if (hash === user.hash) {
        const token = randGen(9);

        const successToken = new Token({
          tag: token, expired: false, origin: config.remoteUrl, user: user._id,
        });
        successToken.save();

        res
          .status(200)
          .contentType('text/json')
          .end(`{"url": "${config.remoteUrl}",
          "name": "accountCookie",
          "value": "${token}",
          "expirationDate": 99999999999999999999,
          "userData": {"expired": false, "username": "${user.username}", "tag": "${token}"}}`);
      } else {
        errors.push('User Verification Failed!');

        res
          .status(200)
          .contentType('text/json')
          .end(JSON.stringify(errorWrap(errors)));
      }
    }
  });
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

    user.save((err, data) => {
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

        const successToken = new Token({
          tag: token, expired: false, origin: config.remoteUrl, user: data._id,
        });
        successToken.save();

        res.status(200)
          .contentType('text/plain')
          .end(`{"url": "${config.remoteUrl}",
          "name": "accountCookie",
          "value": "${token}",
          "expirationDate": 99999999999999999999,
          "userData": {"expired": false, "username": "${data.username}", "tag": "${token}"}}`);
      }
    });
  }
});

router.get('/token/:uid', (req, res, next) => {
  Token.find({ tag: req.params.uid }, (err, token) => {
    if (err) {
      console.log(err);
      res.status(200)
        .contentType('text/json')
        .end(JSON.stringify({ expired: true, err: `${err}` }));
    } else {
      // TODO: Fix this solution, shouldn't need to grab associated user via a fetch here but whatever
      if (!token.length < 1) {
        User.findById(token[0].user, (err, user) => {
          if (err) {
            console.log(err);
            // user found but some error fetching more info
            res.status(200)
              .contentType('text/json')
              .end(JSON.stringify({ expired: true, err: `${err}` }));
          } else {
            const data = { expired: false, username: user.username, tag: token[0].tag };
            res.status(200)
              .contentType('text/json')
              .end(JSON.stringify(data));
          }
        });
      } else {
        console.log('No tag found');
        // no tag found of uid x
        res.status(200)
          .contentType('text/json')
          .end(JSON.stringify({ expired: true, err: 'No tag found' }));
      }
    }
  });
});

module.exports = router;
