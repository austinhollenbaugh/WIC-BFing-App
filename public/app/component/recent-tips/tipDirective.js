angular.module('bfing-app')
  .directive('tipDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './app/component/recent-tips/tipTmpl.html',
      controller: 'tipController'
    }
  })
