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

    this.set = function(data) {
      this.data = data;
      console.log('data in service:', data);
    };
    //
    // this.isLoggedIn = function() {
    //   return {
    //     isLogged: false,
    //     username: ''
    //   };
    // };

  });
