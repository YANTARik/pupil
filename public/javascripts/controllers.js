// Generated by CoffeeScript 1.11.1
(function() {
  angular.module('chatApp').controller('chatCtrl', [
    '$scope', 'mySocket', '$rootScope', function($scope, mySocket, $rootScope) {
      $scope.active_rooms = [];
      $scope.$on('open_room', function(event, data) {
        var room;
        room = {
          messages: [
            {
              'Robot': 'User start chat'
            }
          ],
          is_new_message: true,
          opponent: data.user_id.substring(1, 6),
          participants: [$rootScope.current_user_id, data.user_id]
        };
        $scope.active_rooms.push(room);
        return $scope.current_room = room;
      });
      $scope.send = function() {
        angular.forEach($scope.current_room.participants, function(v, k) {
          return mySocket.emit('send_message', {
            message: $scope.message,
            to_user_id: v,
            from_user_id: $rootScope.current_user_id
          });
        });
        return $scope.message = '';
      };
      return mySocket.on('take_message', function(data) {
        console.log(data);
        return $scope.current_room.messages.push({
          message: data.message
        });
      });
    }
  ]).controller('onlineCtrl', [
    '$scope', 'mySocket', '$rootScope', function($scope, mySocket, $rootScope) {
      $scope.users_online = {};
      mySocket.on('someone_left', function(data) {
        $scope.users_online = data.users_online;
        return console.log('left ' + data.user_id);
      });
      mySocket.on('someone_joined', function(data) {
        $scope.users_online = data.users_online;
        return console.dir(data.users_online);
      });
      return $scope.open_chat = function(user_id) {
        return $rootScope.$broadcast('open_room', {
          user_id: user_id
        });
      };
    }
  ]);

}).call(this);
