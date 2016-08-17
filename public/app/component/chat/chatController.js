angular.module('bfing-app')
  .controller('chatController', function($scope, $state, user) {

    if (user.data.err) {
      $state.go('sign-in');
    }

    $scope.user = user.data;
    console.log(user);

  });
