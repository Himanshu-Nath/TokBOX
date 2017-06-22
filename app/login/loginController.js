angular.module('videoApp')
.controller('loginCtrl', ['$scope','$state', '$rootScope',
	function($scope, $state, $rootScope) {  
	var vm = this;

	// replace these values with those generated in your TokBox Account
	var apiKey = 45892052;
	var sessionId = $rootScope.sessionId ;
	var token = $rootScope.tokenId;

	initializeSession()

	//Handle error
	function handleError(error) {
		if(error){
			alert(error.message);
		}
	}

	function initializeSession(){
		var session = OT.initSession(apiKey, sessionId);
		//subscribe session
		session.on('streamCreated', function(event){
			session.subscribe(event.stream, 'subscriber',{
				insertMode: 'append',
				width: '100%',
				height: '100%'
			}, handleError);
		});

		//create publisher
		var publisher = OT.initPublisher('publisher', {
			insertMode: 'append',
			width: '100%',
			height: '100%'
		}, handleError);

		//connect to session
		session.connect(token, function(error){
			if(error){
				handleError(error);
			} else {
				session.publish(publisher, handleError);
			}
		});
	}
	}
])
