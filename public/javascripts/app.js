// Generated by CoffeeScript 1.11.1
(function() {
  angular.module('pupilApp', ['ngRoute', 'ngRoute.middleware', 'angularFileUpload', 'firebase']).config(function($routeProvider, $locationProvider, $middlewareProvider) {
    $middlewareProvider.map({
      'log': [
        '$log', function($log) {
          $log.debug(this.params);
          return this.next();
        }
      ]
    });
    $routeProvider.when('/', {
      templateUrl: 'pages/users.html',
      controller: 'userCtrl'
    }).when('/page', {
      templateUrl: 'pages/page.html',
      controller: 'pageCtrl',
      middleware: 'log'
    }).when('/upload', {
      templateUrl: 'pages/upload.html',
      controller: 'uploadCtrl'
    }).when('/fb', {
      templateUrl: 'pages/fb.html',
      controller: 'fbCtrl'
    }).otherwise({
      redirectTo: '/'
    });
    return $locationProvider.hashPrefix('');
  });

}).call(this);
