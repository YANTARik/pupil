// Generated by CoffeeScript 1.11.1
(function() {
  var express, router;

  express = require('express');

  router = express.Router();

  router.get('/', function(req, res, next) {
    return res.render('index', {
      title: 'Express'
    });
  });

  router.get('/get_messages', function(req, res, next) {
    return res.send([
      {
        message: 'Hello'
      }, {
        message: 'Everybody'
      }
    ]);
  });

  module.exports = router;

}).call(this);
