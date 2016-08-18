angular.module('bfing-app')
  .controller('tipController', function($scope, tipService) {
    $scope.tips = tipService.tips; 
  })
