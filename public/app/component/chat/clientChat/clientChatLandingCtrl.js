angular.module('bfing-app')
  .controller('clientChatLandingCtrl', function($scope, mainService) {

    var showModal = false;

    $scope.addUserToQ = function(clientID) {
      console.log('user added');
      showModal = true;
      $scope.$emit('addUserToQ', clientID);

    };

    $scope.$on('userAdded', function(ev, clientID) {
      // $scope.userQ.push(clientID);
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
