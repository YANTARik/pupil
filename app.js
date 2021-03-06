// Generated by CoffeeScript 1.11.1
(function() {
  var User, apiRoutes, app, bodyParser, color, config, cookieParser, exec, express, favicon, fs, jwt, logger, mongoose, pages, path, routes, users;

  express = require('express');

  path = require('path');

  favicon = require('serve-favicon');

  logger = require('morgan');

  cookieParser = require('cookie-parser');

  bodyParser = require('body-parser');

  global.appRoot = path.resolve(__dirname);

  color = require('cli-color');

  fs = require('fs');

  exec = require('child_process').exec;

  jwt = require('jsonwebtoken');

  mongoose = require('mongoose');

  config = require('./config');

  User = require('./user_model');

  mongoose.connect(config.database);

  console.log(config);

  routes = require('./routes/index');

  users = require('./routes/users');

  pages = require('./routes/pages');

  app = express();

  fs.lstat(global.appRoot + '/public/node_modules', function(err, stats) {
    var cmd;
    if (err) {
      cmd = "ln -s " + global.appRoot + "/node_modules public/node_modules";
      return exec(cmd, function(err, stdout, stdin) {
        console.log(stdout);
        return console.log('create simlink');
      });
    }
  });

  app.set('views', path.join(__dirname, 'views'));

  app.set('view engine', 'jade');

  app.use(logger('dev'));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(cookieParser());

  app.use(express["static"](path.join(__dirname, 'public')));

  apiRoutes = express.Router();

  apiRoutes.use(function(req, res, next) {
    var token;
    token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      return jwt.verify(token, 'secret', function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          return next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  app.use('/api', apiRoutes);

  app.use('/', routes);

  app.use('/users', users);

  app.use('/pages', pages);

  app.get('/setup', function(req, res) {
    var dima;
    dima = new User({
      name: 'Dima',
      password: '123',
      admin: true
    });
    return dima.save(function(err) {
      if (err) {
        throw err;
      }
      console.log('User saved successfully');
      return res.json({
        success: true
      });
    });
  });

  app.get('/allusers', function(req, res) {
    return User.find({}, function(err, users) {
      return res.json(users);
    });
  });

  app.post('/login', function(req, res) {
    console.log(req.body.name);
    return User.findOne({
      name: req.body.name
    }, function(err, user) {
      var token;
      if (err) {
        throw err;
      }
      if (!user) {
        return res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        if (user.password !== req.body.password) {
          return res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          token = jwt.sign(user, 'secret', {
            expiresIn: '2 days'
          });
          return res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

  app.use(function(req, res, next) {
    var err;
    err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      return res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: {}
    });
  });

  module.exports = app;

}).call(this);
