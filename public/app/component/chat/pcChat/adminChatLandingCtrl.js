angular.module('bfing-app')
  .controller('adminChatLandingCtrl', function($scope, mainService) {

    // if (user.data.err) {
    //     console.log('please sign in for admin access');
    //     $state.go('sign-in');
    // }
    $scope.test = "test";

    $scope.getNextPatient = function(pcID) {
      console.log('hit1');
      $scope.$emit("next patient", pcID);
    };

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
