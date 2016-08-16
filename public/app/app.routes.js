angular.module('bfing-app')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/component/home/home.html',
        // controller: 'homeController'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/component/chat/chat.html',
        // controller: 'chatController'
      })
      .state('resources', {
        url: '/resources',
        templateUrl: 'app/component/resources/resources.html',
        // controller: 'resourcesController'
      })
      .state('sign-in', {
        url: '/signIn',
        templateUrl: 'app/component/sign-in/sign-in.html',
        // controller: 'signInController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/component/register-new-account/register.html',
        // controller: 'registrationController'
      });
  });
