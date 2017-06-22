angular.module('videoApp')

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('login', {
          url : '/login',
          templateUrl: 'app/login/login.html'
        })

        .state('home', {
          url : '/home',
          templateUrl: 'app/home/home.html'
        })

        .state('fail', {
          url : '/fail',
          templateUrl: 'app/fail/fail.html'
        })

        $urlRouterProvider.otherwise('/home');
  }
])