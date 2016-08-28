angular.module('bfing-app')
  .directive('navDir', function () {
    return {
      restrict: 'E',
      templateUrl: './app/component/nav/navTmpl.html'
    };
  });
