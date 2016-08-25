angular.module('bfing-app')
  .controller('publicController', ($scope, mainService, socket) => {
    $scope.welcome = 'mainController is working';

    $scope.isLoggedIn = true;

    $scope.$on("addUserToQ", function(ev, clientID) {
      socket.emit("addUserToQ", clientID);
    });

    socket.on('userAdded', function(clientID) {
      $scope.$broadcast('userAdded', clientID);
    });

    $scope.$on("next patient", function(ev, pcID) {
      // console.log(ev);
      socket.emit("next patient", pcID);
      console.log('publicController', 'pcID:', pcID);
    });

    socket.on("join room", function(pcID, clientID, roomID) {
      $scope.$broadcast("join room", pcID, clientID, roomID);
      console.log('publicCtrl', 'pcID:', pcID, 'clientID:', clientID, 'roomID:', roomID);
    });
    // $scope.roomID
    $scope.$on("send:message", function(ev, message) {
      socket.to().emit("send:message", message);
      console.log("service", message);
    });

    socket.on('grand slam', function(msg) {
      $scope.$broadcast("grand slam", msg);
      console.log("service return", msg);
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
