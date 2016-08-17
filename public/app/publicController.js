angular.module('bfing-app')
  .controller('publicController', function($scope, mainService) {
    $scope.welcome = 'mainController is working';

    mainService.getUser().then(function(response) {
      $scope.user = response.data;
    });

    $scope.facebookLogin = function() {
      console.log('controller');
      mainService.facebookLogin().then(function(response) {
        console.log(response);
        $scope.response = response.data;
      });
    };

  });
