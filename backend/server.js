const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const httpServer = http.createServer(app);
const config = require('./config.json');

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(session({ secret: config.sessionSecret, saveUninitialized: true, resave: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  let resp = 'nothing';

  if (req.session.favColor) {
    resp = req.session.favColor;
  }

  res
    .status(200)
    .contentType('text/plain')
    .end(`Responded with: ${resp}`);
});

app.get('/set', (req, res) => {
  req.session.favColor = 'Red';

  res
    .status(200)
    .contentType('text/plain')
    .end(`Responded with: ${req.session.favColor}`);
});
