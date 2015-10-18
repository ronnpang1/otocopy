




angular.module('starter.controllers').controller('FeedCtrl',["$scope",'$http','$cordovaGeolocation','$ionicPlatform','$state','$stateParams','auth','$ionicModal','geoLocation',function($scope, $http, $cordovaGeolocation,$ionicPlatform,$state, $stateParams,auth,$ionicModal,geoLocation) {
			 
		ionic.Platform.ready(function() {
		$scope.usrcoord={};
		$scope.usrcoord.lat='';
		$scope.usrcoord.lng='';
		$scope.usrcoord.lat=geoLocation.getGeolocation().lat;
		$scope.usrcoord.lng=geoLocation.getGeolocation().lng;
		console.log($scope.usrcoord.lat);
		console.log($scope.usrcoord.lng);
			  
		$scope.auth=auth;
		$scope.usrcoord={};
		
		$scope.inboxlist=[];
	 $ionicModal.fromTemplateUrl('modalinbox.html', function($ionicModal) {
		  id:2;
        $scope.modalinbox = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
	
	
	 
			 $scope.openModal = function(user)
			 {
				  $scope.inbox=user;
				  $scope.modalinbox.show();
				 
			 }
			 
			 $scope.sendinboxmsg= function(user,form)
			 {
				 
				 var inbxmsg={};
				 inbxmsg.sender=$scope.auth.profile.email;
				 inbxmsg.receiver=$scope.inbox;
				 inbxmsg.msg=user.msg;
				 
				 console.log(inbxmsg.sender);
				 console.log(inbxmsg.receiver);
				 console.log(inbxmsg.msg);

				 //inbxmsg.msg=msg;
				 
				 $http.post('https://thawing-cliffs-9435.herokuapp.com/inbox', inbxmsg).success(function(data){
		console.log("good"+data);
		
		 //$window.location.reload();
		$state.go("tab.feed");
		}).error(function(){
		console.log("msg did not go thru");
		$scope.user = null;
		});  
		
		
				 
				 
			 }
		
		
		$scope.item= [{name:"name1"},{name:"name2"},{name:"name3"},{name:"name3"}];
		
		$scope.msg=[];
		$scope.user=[];
		
		console.log("feedctrltest");
		
		   navigator.geolocation.getCurrentPosition(function(position) {
				 console.log(position.coords.latitude);
				  
				   
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
		
		

			   

			   
$scope.reply =function (user,id,form)
      {
		
		var msg={};
		msg.text=user.reply;
		msg.poster=$scope.auth.profile.email;
		msg.id=id;
		console.log(msg.text);
		console.log(msg.poster);
		console.log(msg.id);
		
		
	  
	  $http.post('https://thawing-cliffs-9435.herokuapp.com/reply', msg).success(function(data){
		console.log("good"+data);
		msg.media="";
		 //$window.location.reload();
		$state.go("tab.feed");
		}).error(function(){
		console.log("msg did not go thru");
		$scope.user = null;
		});  
		
	  
	  
	  }
		
		
		 function send(coords)
      {
	  
	  
		console.log("insend");
		$http.post('http://thawing-cliffs-9435.herokuapp.com/feed', coords).success(function(result){
		
				console.log("results:"+result);

		console.log(result.data+"dwq");
		$scope.feedat=result.data;
		$scope.datalist=[];
		for(var i=0;i<result.data.length;i++)
		{
		
		$scope.datalist.push(result.data[i]);
		
		
		}
		
		console.log($scope.datalist);
		console.log(result.data.length + "obj2");
	  
		}).error(function(error){
		console.log("well shit");
		console.log(error );
		});  
		  
	  }
	  
	  $scope.refresh = function () {
		  $scope.datalist=[];
	  	console.log("insend1");
		console.log($scope.usrcoord);
		console.log($scope.usrcoord.usrlat);
		
			$scope.usrcoord.lat=geoLocation.getGeolocation().lat;
			$scope.usrcoord.lng=geoLocation.getGeolocation().lng;
		
		$http.post('http://thawing-cliffs-9435.herokuapp.com/feed', $scope.usrcoord).success(function(result){
		console.log("good12"+result.data[1]);
		
		for(var i=0;i<result.data.length;i++)
		{
		
		$scope.datalist.push(result.data[i]);
		
		
		}
		
		console.log(result.data+"dwq");
		$scope.feedat=result.data;
		console.log(result.data.length + "obj2");
	  
		}).error(function(){
		console.log("well shit");
		
		})
		
		.finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
	  
	  
	  };
	  
			 });
	  
	  
	   
			   
  
}]);