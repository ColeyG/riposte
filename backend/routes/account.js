const express = require('express');

const router = express.Router();

const randGen = (length) => '789hpuj34qjkd';

router.get('/signIn', (req, res, next) => {
  const token = randGen(9);

  res
    .status(200)
    .contentType('text/json')
    .end(`{"url": "http://localhost:3000/","name": "signInCookie", "value": "${token}", "expirationDate": 99999999999999999999}`);
});

module.exports = router;
