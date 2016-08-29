angular.module('bfing-app')
    .controller('chatController', function($scope, $state, mainService, $rootScope, user, $window) {

      // $scope.serviceRoomID = mainService.set();

      $scope.roomID = $window.localStorage.roomID;

      $scope.messages = [];

      $scope.sendMessage = function(msg, userID, roomID) {
        $scope.$emit('send:message', msg, userID, roomID);
      };

      $scope.$on("sendMessageBack", function(ev, msg, userID, roomID) {
          $scope.messages.push(msg);
          $scope.$apply();
          mainService.addMessage(msg, userID, roomID)
          .then(function(response) {
            console.log("db response in chat Controller:", response);
          });
      });

      mainService.getUser().then(function(response) {
        $scope.user = response.data.displayName;

        $scope.id = response.data.id;

        console.log(response.data);

        if (response.data.err) {
          $scope.isLoggedIn = false;
        } else {
          $scope.isLoggedIn = true;
        }
      });

    });

              // console.log('chatController ', message);

    // $scope.messages.push(msg);

    // $scope.messages.push({
    //     user: $scope.user,
    //     text: $scope.message
    // });

    // console.log('roomID on scope in chatController:', $scope.getRoomID);

    // if (user.data.err) {
    //     console.log('please sign in to access chat')
    //     $state.go('sign-in');
    // }

    // $scope.user = user.data;
    // console.log(user, );

    // $scope.name = user.data.displayName;

    // $scope.roomID = mainService.roomID;
    // console.log('ROOM ID FROM SERVICE', $scope.roomID);

    // $rootScope.$on("joined room", function(ev, roomID) {
    //   // console.log('hit chat controller, joined room');
    //   // console.log(arguments);
    //     // $rootScope.roomID = roomID;
    // });

    // console.log($scope.roomID);

    // $scope.clearInput = function() {
    //   $scope.msg = '';
    // }
