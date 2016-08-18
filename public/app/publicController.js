angular.module('bfing-app')
  .controller('publicController', function($scope, $rootScope, mainService) {
    $scope.welcome = 'mainController is working';

    $scope.isLoggedIn = true;

    mainService.getUser().then(function(response) {
      $scope.user = response.data;

      if (response.data.err) {
        $scope.isLoggedIn = false;
      } else {
        $scope.isLoggedIn = true;
      }
    });

  });
