// Generated by CoffeeScript 1.11.1
(function() {
  var app, debug, http, normalizePort, onError, onListening, port, reload, server;

  app = require('../app');

  debug = require('debug')('cs_pupil_start:server');

  http = require('http');

  reload = require('reload');

  normalizePort = function(val) {
    var port;
    port = parseInt(val, 10);
    if (isNaN(port)) {
      val;
    } else if (port >= 0) {
      port;
    }
    return false;
  };

  onError = function(error) {
    var bind;
    if (error.syscall !== 'listen') {
      throw error;
    }
    bind = typeof port === 'string' ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + " requires elevated privileges");
        return process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + " is already in use");
        return process.exit(1);
      default:
        throw error;
    }
  };

  onListening = function() {
    var addr, bind;
    addr = server.address();
    bind = typeof addr === 'string' ? "pipe " + addr : "port " + addr.port;
    return debug("Listening on " + bind);
  };

  port = normalizePort(process.env.PORT) || '3000';

  app.set('port', port);

  server = http.createServer(app);

  reload(server, app, true);

  server.listen(port);

  server.on('error', onError);

  server.on('listening', onListening);

}).call(this);
