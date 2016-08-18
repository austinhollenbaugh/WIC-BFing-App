angular.module('bfing-app')
  .controller('homeController', function($scope, isLoggedIn, mainService) {
      console.log(isLoggedIn);
      $scope.isLoggedIn = false;

      if (!isLoggedIn.err) {
        $scope.isLoggedIn = true;
      }
  });
