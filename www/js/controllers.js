var app = angular.module('starter.controllers', ["leaflet-directive"]);


// FUCK
  app.controller("MapIndexCtrl", [ "$scope", "leafletData",'$geolocation','$http','$state',
  
  function($scope, leafletData, $geolocation, $http,$state) 
  {
			
			$scope.master = {};
			$scope.lat=' ';
			$scope.lng=' ';
			$scope.rad=10;
	  
	  $scope.send= function (user)
      {
		$scope.master = angular.copy(user);
		var msg={};
		msg.text=$scope.master.msg;
		msg.lat=$scope.lat;
		msg.lng=$scope.lng;
		msg.rad=$scope.rad;
		console.log(msg.rad+"RADIUS");
		console.log(msg.text +msg.lat);
		$http.post('https://thawing-cliffs-9435.herokuapp.com/addmsg', msg).success(function(data){
		console.log("good"+data
			);
		$state.go("tab.feed");
		}).error(function(){
		console.log("msg did not go thru");
		});  
		  
		  
	  }
	  
			$scope.map = {
			defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          
          center:
			  {
			  lat : 45.32132,
			  lng : -71.3231,
			  zoom:12
			  },
         
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
          
          
          
        };

       $geolocation.get().then(function(position)
			   {
				   
				   console.log(position.coords.latitude);
				   $scope.map.center.lat=position.coords.latitude;
				   $scope.map.center.lng=position.coords.longitude;
				   $scope.lat=position.coords.latitude;
				   $scope.lng=position.coords.longitude;
				   coords = {};
				   coords.lat=position.coords.latitude;
				   coords.lng=position.coords.longitude;
				   console.log(position);
					
				  
			   });
			   
			   
				   
				   
	  leafletData.getMap().then(function(map) {
		 
	  var currentDiameter = L.circle([ $scope.map.center.lat,$scope.map.center.lng], 2000);
	  map.addLayer(currentDiameter);
      var drawnItems = new L.featureGroup().addTo(map);


		
      map.addControl(new L.Control.Draw({
		  draw:{
			rectangle:false,
			polygon: false,
			
			
		polyline:false
			   },
		  
		  
        edit: {featureGroup: drawnItems }
      }));
      map.on('draw:created', function (event) {
          var layer = event.layer;
		  drawnItems.addLayer(layer);
          console.log(JSON.stringify(layer.toGeoJSON()));
          console.log(JSON.stringify(layer.getRadius()));
          console.log(JSON.stringify(layer.getLatLng().lat));
          var msgcoor= {};
          $scope.lat=layer.getLatLng().lat;
          $scope.lng=layer.getLatLng().lng;
          $scope.rad=layer.getRadius();
          console.log("msgcoord"+ layer.getLatLng().lng);
          msgcoor.rad=JSON.stringify(layer.getRadius());
          msgcoor.lat=JSON.stringify(layer.getLatLng().lat);
          msgcoor.lng=JSON.stringify(layer.getLatLng().lng);
          send(msgcoor);
          console.log(msgcoor.rad);
      });
      
      
      
      //http post to server
      function send(coord)
      {
		
		$http.post('/geolog', coord).success(function(data){
		console.log("good"+data);
		}).error(function(){
		console.log("well shit");
		});  
		  
	  }

       });
       
       }]);

// A simple controller that shows a tapped item's data
app.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
  
});



app.controller('feedCtrl',["$scope",'$geolocation','geoparser','$http',function($scope, $geolocation,geoparser, $http) {
  // 
		
		$scope.item= [{name:"name1"},{name:"name2"},{name:"name3"},{name:"name3"}];
		$scope.datalist=[];
		$scope.msg=[];
		$scope.user=[];
		var it=this;
		it.varlist=[];
		console.log($scope.msg);
		
		 
		
		
		$geolocation.get().then(function(position)
			   {
				   
				   console.log(position.coords.latitude);
				   coords = {};
				   coords.lat=position.coords.latitude;
				   coords.lng=position.coords.longitude;
				   console.log(position);
				   
				   send(coords);	
				   
			   });
			   
		 function send(coord)
      {
		
		$http.post('https://thawing-cliffs-9435.herokuapp.com/feed', coord).success(function(result){
		console.log("good12"+result.data[1]);
		console.log(result.data[1].msg);
		console.log(result.data+"dwq");
		$scope.feedat=result.data;
		console.log(result.data.length);
	  
		}).error(function(){
		console.log("well shit");
		
		});  
		  
	  }console.log(it.varlist.length);
	  
	
	  
	  
	   
			   
  
}]);


app.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $location.path('/tab/about');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();
  
  
});
