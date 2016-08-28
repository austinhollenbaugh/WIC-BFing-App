angular.module('bfing-app')
  .controller('publicController', ($scope, mainService, $rootScope, socket, $window) => {
    $scope.welcome = 'mainController is working';

    $scope.isLoggedIn = true;

    $scope.$on("addUserToQ", function(ev, clientID) {
      socket.emit("addUserToQ", clientID);
    });

    socket.on('userAdded', function(clientID) {
      $scope.$broadcast('userAdded', clientID);
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

    $scope.$on("send:message", function(ev, message, userID, roomID) {
      socket.emit("send:message", message);
    });

    socket.on('sendMessageBack', function(msg, userID) {
      $scope.$broadcast("sendMessageBack", msg, userID);
      console.log('public Ctrl, msg:', msg);
    });

    mainService.getUser().then(function(response) {
      $scope.user = response.data.displayName;

      console.log(response.data);

      if (response.data.err) {
        $scope.isLoggedIn = false;
      } else {
        $scope.isLoggedIn = true;
      }
    });

  });

        // console.log('publicCtrl', 'roomID:', roomID);
