angular.module('videoApp')
.controller('loginCtrl', ['$scope','$state', '$rootScope',
	function($scope, $state, $rootScope) {
		var vm = this;
		var session = undefined;
		var publisher;
		var subscriber;
		vm.connectionCount = 0;
		vm.alertView = true;
		var pubOptions = {
			insertMode: 'append',
			width: '100%',
			height: '100%',
			usePreviousDeviceSelection: true,
			resolution: '1280x720',
			publishAudio: true, 
			publishVideo: true
		};
		var subOptions = {
			insertMode: 'append',
			width: '100%',
			height: '100%'
		}

		// replace these values with those generated in your TokBox Account
		var apiKey = 45892052;
		var sessionId = localStorage.getItem("sessionId");
		var token = localStorage.getItem("tokenId");

		if (OT.checkSystemRequirements() == 1) {
			initializeSession()
		} else {
			vm.alertView = false;
		}

		//Handle error
		function handleError(error) {
			if(error){
				if (error.name === "OT_NOT_CONNECTED") {
					console.log('Failed to connect. Please check your connection and try connecting again.');
				} else {
					console.log('An unknown error occurred connecting. Please try again later.');
				}
			}
		}

		function initializeSession(){
			session = OT.initSession(apiKey, sessionId);

			//create publisher
			// publisher = OT.initPublisher('publisher', pubOptions, handleError);

			// publisher.on({
			// 	accessAllowed: function (event) {
			// 		console.log("Camera and Microphone access granted");
			// 	},
			// 	accessDenied: function accessDeniedHandler(event) {
			// 		growl.info("You need to allow access to camera and microphone to proceed");
			// 	}
			// });

			//connect to session
			session.connect(token, function(error){
				if(error){
					vm.dissconnectSession();
					if (error.name === "OT_AUTHENTICATION_ERROR") {
						console.log('Authentication Failed');
					} else {
						console.log('Some other token related error');
					}
				} else {
					console.log("Connected to the session.");
					if (session.capabilities.publish == 1) {
						//session.publish(publisher, handleError);
						publishInit();						
					}
				}
			});

			subscriptionStart();
			//subscribe session
			// session.on('streamCreated', function(event){
			// 	subscriber = session.subscribe(event.stream, 'subscriber', subOptions, handleError);				
			// });
			
			session.on({
				connectionCreated: function (event) {
					$scope.$apply(function () {
						vm.connectionCount++;
					});					
					console.log(' connectionCreated.'+vm.connectionCount);
				},
				connectionDestroyed: function (event) {
					$scope.$apply(function () {
						vm.connectionCount--;
					});
					console.log(' connectionDestroyed.'+vm.connectionCount);
				},
				sessionDisconnected: function sessionDisconnectHandler(event) {
					if (event.reason == 'networkDisconnected') {
						alert('Your network connection terminated.')
					}
					console.log('Disconnected from the session.');
				}, 
				streamDestroyed: function (event){
					
				}
				// sessionReconnecting: function() {
				// 	console.log("---------+")
				// },
				// sessionReconnected: function() {
				// 	console.log("---------++")
				// },
			});			
		}

		function publishInit(){
			publisher = OT.initPublisher('publisher', pubOptions, handleError);

			publisher.on({
				accessAllowed: function (event) {
					console.log("Camera and Microphone access granted");
				},
				accessDenied: function accessDeniedHandler(event) {
					growl.info("You need to allow access to camera and microphone to proceed");
				}
			});

			publishStart();
		}

		function publishStart(){
			session.publish(publisher, handleError);
		}

		function subscriptionStart(){
			console.log("---------1")
			session.on('streamCreated', function(event){
				subscriber = session.subscribe(event.stream, 'subscriber', subOptions, handleError);				
			});
		}

		vm.dissconnectSession = function(){
			//session.unsubscribe(subscriber);
			// session.unpublish(publisher);
			// publisher.destroy();
			session.disconnect();
			//session = undefined;
			//session.forceDisconnect(session.connection.id, handleError);
			localStorage.removeItem("sessionId");
			//$state.go('home')
			location.reload();
		}

		vm.dissconnectPublish = function(){
			publisher.destroy();
			// session.unpublish(publisher);
			// subscriber = session.subscribe(event.stream, 'subscriber', subOptions, handleError);	
		}

		vm.dissconnectSubscription = function(){
			session.unsubscribe(subscriber);
		}

		vm.startPublish = function(){
			publishInit();
		}

		// function screenshare() {
		// 	OT.checkScreenSharingCapability(function(response) {
		// 		if (!response.supported || response.extensionRegistered === false) {
		// 			alert('This browser does not support screen sharing.');
		// 		} else if (response.extensionInstalled === false) {
		// 			alert('Please install the screen sharing extension and load your app over https.');
		// 		} else {
		// 			// Screen sharing is available. Publish the screen.
		// 			var screenSharingPublisher = OT.initPublisher('screen-preview', {videoSource: 'screen'});
		// 			session.publish(screenSharingPublisher, function(error) {
		// 				if (error) {
		// 				alert('Could not share the screen: ' + error.message);
		// 				}
		// 			});
		// 		}
		// 	});
		// }

		//event call when page reload
		$(window).bind('beforeunload',function() {
			vm.dissconnectSession();
		});
	}
])
