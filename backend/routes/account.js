const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res
    .status(200)
    .contentType('text/plain')
    .end('Account');
});

module.exports = router;
