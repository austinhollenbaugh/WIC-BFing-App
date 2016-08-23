angular.module('bfing-app')
  .controller('publicController', ($scope, mainService, socket) => {
    $scope.welcome = 'mainController is working';

    $scope.isLoggedIn = true;

    // socket.on('init', function(data) {
    //   $scope.name = data.name;
    //   $scope.users = data.users;
    // });

    // socket.on('user:join', function(data) {
    //   $scope.messages.push({
    //     user: 'chatroom',
    //     text: 'User ' + data.name + ' has joined.'
    //   });
    //   $scope.users.push(data.name);
    // })

    $scope.$on("send:message", function(ev, message) {
      socket.emit("homerun", message);
      console.log("service", message);
    });

    socket.on('grand slam', function(msg) {
      $scope.$broadcast("grand slam", msg);
    });

    mainService.getUser().then(function(response) {
      $scope.user = response.data.displayName;

      if (response.data.err) {
        $scope.isLoggedIn = false;
      } else {
        $scope.isLoggedIn = true;
      }
    });

  });
