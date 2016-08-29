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

    this.addMessage = function(msg, userID, roomID) {
      return $http({
        method: 'POST',
        url: '/addMessage',
        data: {date_time: new Date(), message: msg, user_id: userID, room_id: roomID}
      })
    }

  });

  // this.set = function(data) {
  //   this.data = data;
  //   console.log('data in service:', data);
  // };
  //
  // this.isLoggedIn = function() {
  //   return {
  //     isLogged: false,
  //     username: ''
  //   };
  // };
