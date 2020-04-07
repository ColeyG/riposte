const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const httpServer = http.createServer(app);
const config = require('../config/config.json');

const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoSession}/${config.mongoName}?authSource=admin`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const indexRouter = require('../routes/index');
const accountRouter = require('../routes/account.js');

app.use(session({ secret: config.sessionSecret, saveUninitialized: true, resave: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/account', accountRouter);
