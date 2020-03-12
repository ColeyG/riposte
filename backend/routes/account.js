const express = require('express');

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
    .end(`{"url": "http://localhost:3000/","name": "signInCookie", "value": "${token}", "expirationDate": 99999999999999999999}`);
});

module.exports = router;
