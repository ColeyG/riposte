const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  let resp = 'nothing';

  if (req.session.favColor) {
    resp = req.session.favColor;
  }

  res
    .status(200)
    .contentType('text/plain')
    .end(`Responded with: ${resp}`);
});

router.get('/set', (req, res) => {
  req.session.favColor = 'Red';

  res
    .status(200)
    .contentType('text/plain')
    .end(`Responded with: ${req.session.favColor}`);
});

module.exports = router;
