angular.module('starter.controllers').controller('starter.feedCtrl',["$scope",'$http','$cordovaGeolocation','$ionicPlatform','$state','$stateParams','auth','$ionicModal',function($scope, $http, $cordovaGeolocation,$ionicPlatform,$state, $stateParams,auth,$ionicModal) {
			 
			  
		$scope.auth=auth;
		$scope.usrcoord={};
		$scope.usrcoord.lat='';
		$scope.usrcoord.lng='';
		
		
		
		$scope.item= [{name:"name1"},{name:"name2"},{name:"name3"},{name:"name3"}];
		
		$scope.msg=[];
		$scope.user=[];
		
		$ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
		   id:1;
        $scope.modaltext = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
		
		console.log("feedctrltest");
		
		   navigator.geolocation.getCurrentPosition(function(position) {
				 console.log(position.coords.latitude);
				  
				   
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
		
		
		var posOptions = {timeout: 10000, enableHighAccuracy: false ,  maximumAge: 90000};
		console.log("feedctrltest1");
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
				   console.log("in geolocation");
				   console.log("pie?");
				   console.log(position.coords.latitude);
				   coords = {};
				   coords.lat=position.coords.latitude;
				   coords.lng=position.coords.longitude;
				   console.log(position+"test");
				   $scope.usrcoord.lat=position.coords.latitude;;
				   $scope.usrcoord.lng=position.coords.longitude;
				   send(coords);
				   
				   
				   
			   },function(err){
			   console.log("cant parse");
			   console.log(err.message);
			   coords = {};
			   coords.lat=45.4956033;
			   coords.lng=-73.57916300000001;
			   send(coords);
			   
			     
			   
			   });
			   console.log("gap");
			   
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
	  	console.log("insend1");
		console.log($scope.usrcoord);
		console.log($scope.usrcoord.usrlat);
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
	  
	
	  
	  
	   
			   
  
}]);


 
