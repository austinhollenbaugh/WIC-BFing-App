angular.module('bfing-app')
    .controller('publicController', ($scope, mainService, socket, $state, $window) => {

      $scope.$on("addUserToQ", function(ev, clientID) {
          socket.emit("addUserToQ", clientID);
      });

      socket.on('userAdded', function(clientID) {
          $scope.$broadcast('userAdded', clientID);
      });

      socket.on('waitingList:update', function(waitingUsers) {
          $scope.$broadcast('waitingList:update', waitingUsers);
      });

      $scope.$on("next patient", function(ev, pcID) {
          socket.emit("next patient", pcID);
      });

      socket.on("joined room", function(roomID) {

          $scope.$broadcast("joined room", roomID);

          console.log('roomID in pubCtrl:', roomID);
          $window.localStorage.roomID = roomID;
          // mainService.set(roomID);
      });

      $scope.$on("send:message", function(ev, msg, userID, roomID) {
          socket.emit("send:message", msg, userID, roomID);
      });

      socket.on('sendMessageBack', function(msg, userID, roomID) {
          $scope.$broadcast("sendMessageBack", msg, userID);
      });

      $scope.chatRedirect = function() {
          if ($scope.user.type === 'admin') {
              $state.go('admin-chat-landing');
              console.log('welcome, admin');
          } else if ($scope.user.type === 'client') {
              $state.go('client-chat-landing');
              console.log('welcome, client');
          } else {
              console.log('ERRORS:', $scope.user.type);
          }

      };

      mainService.getUser().then(function(response) {
          $scope.user = response.data;
          console.log($scope.user);

          if (response.data.err) {
              $scope.isLoggedIn = false;
          } else {
              $scope.isLoggedIn = true;
              if ($scope.user.google_id) {
                  $scope.isGoogle = true;
                  console.log('google');
              } else if ($scope.user.facebook_id) {
                  $scope.isFb = true;
                  console.log('fb');
              }
          }
      });

    });


// console.log('publicCtrl', 'roomID:', roomID);
