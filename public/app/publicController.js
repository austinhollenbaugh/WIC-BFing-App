angular.module('bfing-app')
  .controller('publicController', ($scope, mainService, $rootScope, socket) => {
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
      console.log('hit publicController, ', 'pcID:', pcID);
    });

    socket.on("joined room", function(roomID) {
      // $rootScope.$broadcast("joined room", roomID);
      // console.log('publicCtrl', 'roomID:', roomID);
      console.log('roomID in pubCtrl:', roomID);
      mainService.set(roomID);

      // mainService.getRoomID(roomID).then(function(response) {
      //   $scope.roomID = response;
      // })

    });

    $scope.$on("send:message", function(ev, message, id) {
      socket.to($rootScope.roomID).emit("send:message", message);
      console.log("service", message);
    });

    socket.on('sendMessageBack', function(msg, id) {
      $scope.to($rootScope.roomID).$broadcast("sendMessageBack", msg, id);
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
