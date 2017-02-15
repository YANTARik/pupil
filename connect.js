// Generated by CoffeeScript 1.11.1
(function() {
  var app, basicAuth, compression, connect, cookieParser, cookieSession, http, isAuth, logger, serveStatic;

  connect = require('connect');

  http = require('http');

  app = connect();

  logger = require('morgan');

  serveStatic = require('serve-static');

  cookieParser = require('cookie-parser');

  cookieSession = require('cookie-session');

  isAuth = require('./is_auth');

  basicAuth = require('basic-auth-connect');

  app;

  compression = require('compression');

  app.use(basicAuth('1', '2')).use(compression()).use(logger()).use(serveStatic(__dirname)).use(cookieParser()).use(cookieSession({
    key: 'my_key',
    secret: 'sekret',
    maxAge: 60 * 60 * 24
  })).use(isAuth()).use('/auth', function(req, res, next) {
    console.log('get requset from auth');
    return next();
  }).use(function(req, res, next) {
    console.log(req.session);
    return next();
  }).use('/sess', function(req, res, next) {
    req.session.foo = 'Hello';
    return res.end('done');
  }).use('/sessd', function(req, res, next) {
    delete req.session.foo;
    return res.end('done del');
  }).use(function(req, res, next) {
    res.write(JSON.stringify({
      x: 10,
      y: 40
    }));
    return res.end();
  });

  http.createServer(app).listen(8080);

}).call(this);