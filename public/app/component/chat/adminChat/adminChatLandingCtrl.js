angular.module('bfing-app')
  .controller('adminChatLandingCtrl', function($scope, mainService) {

    $scope.joinChat = function(pcID) {
      $scope.$emit("next patient", pcID);
    }

    $scope.$on("join room", function(ev, pcID, userID, roomID) {
      //join roomid
      var clientID = null;
        console.log('adminChatLandingCtrl', 'pcID:', pcID, 'clientID:', clientID, 'roomID:', roomID);
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
