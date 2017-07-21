angular.module('videoApp')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider
        .state('login', {
          url : '/login',
          templateUrl: 'app/login/login.html',
          authenticate: false
        })

        .state('home', {
          url : '/home',
          templateUrl: 'app/home/home.html',
          authenticate: true
        })

        .state('fail', {
          url : '/fail',
          templateUrl: 'app/fail/fail.html',
          authenticate: false
        })
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');
  }
])
/**
 * Run function of angularJS
 */
.run(function ($rootScope, $state, HomeService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.url != "/home" && toState.name != "home") {
      if(HomeService.isSessionCreated() == null ){
            event.preventDefault();
        $state.go('home');
      }
    }
	  
  });
});