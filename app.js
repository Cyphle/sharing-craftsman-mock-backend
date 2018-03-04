const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const MockBackEndApplication = require('./server/MockBackEndApplication');

// Default config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/* APPLICATION */
let application = new MockBackEndApplication(app);
application.bootstrapAPI();

console.log('========== ****** ==========');
console.log('SHARING CRAFTSMAN MOCK BACK-END HAS STARTED ON PORT 3000');
console.log('========== ****** ==========');
/* END APPLICATION */

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(`${new Date()} -- [app] Not found ${err.message}`);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.log(`${new Date()} -- [app] Error ${err.message}`);
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  console.log(`${new Date()} -- [app] Error ${err.message}`);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

module.exports = app;
