angular.module('bfing-app')
  .controller('chatLandingController', function($scope) {

    $scope.joinChat = function(pcID) {
      $scope.$emit("next patient", pcID);
    }

    $scope.$on("join room", function(ev, pcID, userID, roomID) {
      //join roomid
        console.log('chatLandingCtrl', pcID);
    });

  });
