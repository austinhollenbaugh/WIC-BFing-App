angular.module('bfing-app')
  .controller('adminChatLandingCtrl', function($scope, $state, mainService) {

    // if (user.data.err) {
    //     console.log('please sign in for admin access');
    //     $state.go('sign-in');
    // }
    $scope.test = "test";

    $scope.getNextPatient = function(pcID) {
      console.log('hit adminChatLandingCtrl');
      $scope.$emit("next patient", pcID);
    };

    $scope.$on("joined room", function(ev, roomID) {
        $state.go('chat');
        console.log('adminChatLandingCtrl',  'roomID:', roomID);
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
