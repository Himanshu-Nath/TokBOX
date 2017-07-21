angular.module('videoApp')
.factory('HomeService', ['$http', '$q',
	function($http, $q) {
	var HomeService = {};

	HomeService.isSessionCreated = function(){
		return localStorage.getItem("sessionId");
	}
	HomeService.createSession = function() {
		var deferred = $q.defer();
		$http.get('/api/createSession').then(
				function(response) {
					deferred.resolve(response.data.SESSION);
				}, function(error) {
					console.log(error);
					deferred.reject(error);
				}
		)
		return deferred.promise;
	}

    HomeService.createToken = function(sessionId) {
		var deferred = $q.defer();
		$http.get('/api/createToken/'+ sessionId).then(
				function(response) {
					deferred.resolve(response.data.token);
				}, function(error) {
					console.log(error);
					deferred.reject(error);
				}
		)
		return deferred.promise;
	}

	return HomeService;
}
])
