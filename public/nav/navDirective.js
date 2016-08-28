angular.module('bfing-app')
  .directive('navDir', function () {
    return {
      restrict: 'E',
      templateUrl: './app/components/nav/navTmpl.html',
      controller: 'navCtrl'
    };
  });
