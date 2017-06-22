angular.module('videoApp')
.controller('homeCtrl', ['$scope','$state', 'HomeService', '$rootScope', '$timeout',
	function($scope, $state, HomeService, $rootScope, $timeout) {  
	var vm = this;
	vm.alertView = true;
	vm.messageView = true;
	vm.disableToken = true;

	vm.createSession = function() {
		HomeService.createSession().then(
			function(response) {
				vm.session = response;
				$rootScope.sessionId = response.sessionId;
				vm.alertView = false;
				vm.disableToken = false;
				vm.messageView = false;
				$timeout(function () { vm.alertView = true;}, 3000);  
			}, function(error) {
				
		});
	}

	vm.createToken = function() {
        HomeService.createToken(vm.session.sessionId).then(
			function(response) {
				$rootScope.tokenId = response;
				$state.go("login")				
			}, function(error) {
				
	    });
	}

}
])
