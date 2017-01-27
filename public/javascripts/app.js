// Generated by CoffeeScript 1.11.1
(function() {
  angular.module('chatApp', ['ui.router', 'btford.socket-io', 'angular-uuid']).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('chat', {
      url: '/',
      templateUrl: 'chat.html'
    }).state('chat.index', {
      url: 'index',
      views: {
        '': {
          templateUrl: 'chat-index.html'
        },
        'user-online': {
          templateUrl: 'chat-user-online.html'
        }
      }
    }).state('chat.history', {
      url: 'users',
      templateUrl: 'chat-history.html'
    }).state('chat.404', {
      url: '404',
      templateUrl: '404.html'
    });
    $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/404');
    $locationProvider.html5Mode(false);
    return $locationProvider.hashPrefix('');
  }).run([
    'mySocket', 'uuid', '$rootScope', function(mySocket, uuid, $rootScope) {
      var user_id;
      user_id = uuid.v4();
      mySocket.on('time', function(data) {
        return console.log(data);
      });
      return mySocket.emit('join', {
        user_id: user_id
      });
    }
  ]);

}).call(this);
