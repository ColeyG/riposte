const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const httpServer = http.createServer(app);
const config = require('../config/config.json');

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const indexRouter = require('../routes/index');

app.use(session({ secret: config.sessionSecret, saveUninitialized: true, resave: true }));
app.use(cookieParser());

app.use('/', indexRouter);
