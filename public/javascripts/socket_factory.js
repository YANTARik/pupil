// Generated by CoffeeScript 1.11.1
(function() {
  angular.module('chatApp').factory('mySocket', function(socketFactory) {
    var mySocket;
    mySocket = socketFactory({
      disconnect: function(close) {
        return alert('ddd');
      }
    });
    return mySocket;
  });

}).call(this);
