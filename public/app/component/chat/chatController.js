angular.module('bfing-app')
    .controller('chatController', function($scope, $state, mainService, user) {

            if (user.data.err) {
                $state.go('sign-in');
            }

            // $scope.user = user.data;
            // console.log(user, );

            // $scope.name = user.data.displayName;

            $scope.messages = [];

            $scope.sendMessage = function(messageText) {
                // socket.emit('send:message', {
                //     message: $scope.message
                // });

                $scope.$emit('send:message', messageText);

                $scope.messages.push(messageText);

                // $scope.messages.push({
                //     user: $scope.user,
                //     text: $scope.message
                // });

                $scope.message = '';
              };



          // $scope.clearInput = function() {
          //   $scope.msg = '';
          // }

        $scope.$on("grand slam", function(ev, message) {
            console.log('chatController ', message);
            $scope.messages.push(message);
            $scope.$apply();
        });

    });
