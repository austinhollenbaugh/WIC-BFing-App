angular.module('bfing-app')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/component/home/home.html',
        // controller: 'homeController',
        resolve: {
          isLoggedIn: function(mainService) {
            return mainService.getUser().then(function(response) {
              return response.data;
            })
          }
        }
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/component/chat/chat.html',
        resolve: {
          user: function(mainService) {
            return mainService.getUser();
          }
        },
        controller: 'chatController'
      })
      .state('admin-chat-landing', {
        url: '/admin-chat-landing',
        templateUrl: 'app/component/chat/adminChat/admin-chat-landing.html',
        controller: 'adminChatLandingCtrl'
      })
      .state('client-chat-landing', {
        url: '/client-chat-landing',
        templateUrl: 'app/component/chat/clientChat/client-chat-landing.html',
        controller: 'clientChatLandingCtrl'
      })
      .state('recent-tips', {
        url: '/recent-tips',
        templateUrl: 'app/component/recent-tips/tip.html',
        controller: 'tipController'
      })
      .state('resources', {
        url: '/resources',
        templateUrl: 'app/component/resources/resources.html',
        // controller: 'resourcesController'
      })
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'app/component/sign-in/sign-in.html',
        // controller: 'publicController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/component/register-new-account/register.html',
        // controller: 'registrationController'
      })
      .state('account', {
        url: '/register',
        templateUrl: 'app/component/userAccount/userAccount.html',
        controller: 'accountController'
      })
      .state('menu', {
        url: '/menu',
        templateUrl: 'app/component/mobileMenu/menu.html'
      });
  });
