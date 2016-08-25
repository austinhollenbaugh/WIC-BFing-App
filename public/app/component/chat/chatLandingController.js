angular.module('bfing-app')
  .controller('chatLandingController', function($scope, mainService) {

    $scope.joinChat = function(pcID) {
      $scope.$emit("next patient", pcID);
    }

    $scope.$on("join room", function(ev, pcID, userID, roomID) {
      //join roomid
        console.log('chatLandingCtrl', pcID);
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
