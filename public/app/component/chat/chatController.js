angular.module('bfing-app')
    .controller('chatController', function($scope, $state, mainService, user) {
        if (user.data.err) {
            console.log('please sign in to access chat')
            $state.go('sign-in');
        }

        // $scope.user = user.data;
        // console.log(user, );

        // $scope.name = user.data.displayName;

        $scope.messages = [];



        $scope.sendMessage = function(messageText, id, roomID) {

            $scope.to($scope.roomID).$emit('send:message', messageText, id, roomID);

            $scope.messages.push(messageText);

            // $scope.messages.push({
            //     user: $scope.user,
            //     text: $scope.message
            // });

            $scope.message = '';
        };

        $scope.$on("joined room", function(ev, pcID, clientID, roomID) {
          console.log('hit chat controller joined room')
          console.log(arguments);
            $scope.roomID = roomID;
        });

        // console.log($scope.roomID);

        // $scope.clearInput = function() {
        //   $scope.msg = '';
        // }

        $scope.$on("sendMessageBack", function(ev, message) {
            console.log('chatController ', message);
            $scope.messages.push(message);
            $scope.$apply();
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
