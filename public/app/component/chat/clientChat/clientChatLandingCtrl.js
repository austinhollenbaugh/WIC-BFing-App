angular.module('bfing-app')
  .controller('clientChatLandingCtrl', function($scope, mainService) {

    $scope.userQ = [];

    $scope.addUserToQ = function(clientID) {
      $scope.$emit('addUserToQ', clientID);

    };

    $scope.userJoinChat =

    $scope.$on('userAdded', function(ev, clientID) {
      $scope.userQ.push(clientID);
    });

    mainService.getUser().then(function(response) {
      $scope.user = response.data.displayName;

      $scope.id = response.data.id;

      console.log(response.data);

      if (response.data.err) {
        $scope.isLoggedIn = false;
      } else {
        $scope.isLoggedIn = true;
      }
    });
  });
