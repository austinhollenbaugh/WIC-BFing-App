angular.module('bfing-app')
  .service('mainService', function($http) {

    this.facebookLogin = function() {
      return $http({
        method: 'GET',
        url: '/auth/facebook'
      });
    };

    this.getUser = function() {
      return $http({
        method: 'GET',
        url: '/me'
      });
    };

    this.userJoinChat = function() {
      return $http({
        method: 'GET',
        url: '/joinChat'
      });
    };
    //
    // this.isLoggedIn = function() {
    //   return {
    //     isLogged: false,
    //     username: ''
    //   };
    // };

  });
