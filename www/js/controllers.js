var app = angular.module('starter.controllers', ["leaflet-directive"]);


// FUCK
  app.controller("MapIndexCtrl", [ "$scope", "leafletData",'$geolocation','$http','$state', '$stateParams',
  
  
  
  function($scope, leafletData, $geolocation, $http,$state, $stateParams, $window) 
  {
  
	
		
			$state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
});

			$scope.layer='';
			$scope.master = {};
			$scope.lat= ' ';
			$scope.lng= ' ';
			$scope.rad=10;
			
		
            
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
				   $scope.$apply();
				  
			   },function(err){
			   console.log("cant parse mapdiv");
			   console.log(err.message);
			   });
			
			
   
			
			
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
		 leafletData.getMap().then(function(map) {
		 map.removeLayer($scope.layer);
		 });
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
			  lng : -73.352686,
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
		
		
				
       
   

     
			   
			   
				   
				   
	  leafletData.getMap().then(function(map) {
		 
	 
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
			  map.removeLayer($scope.layer);
		  
          var layer = event.layer;
		  $scope.layer=layer;
	  
		  
	
		  
		 
		 
		  var layer = event.layer;
		  $scope.layer=layer;
		  drawnItems.addLayer(layer);
		  console.log(layer);
		    if (layer instanceof L.Circle) {
			console.log("circle");
    

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
          console.log(msgcoor.rad);
		  }
		  
      });
      
      
      
      //http post to server
      

       });
       
       }]);

// A simple controller that shows a tapped item's data
app.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
  
});



app.controller('feedCtrl',["$scope",'$http','$cordovaGeolocation','$ionicPlatform','$state','$stateParams',function($scope, $http, $cordovaGeolocation,$ionicPlatform,$state, $stateParams) {
			 
			  
			  
		$scope.usrcoord={};
		$scope.usrcoord.lat='';
		$scope.usrcoord.lng='';
		ionic.Platform.ready(function() {
      
	  var options = {
      enableHighAccuracy: true,
      timeout: 100000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
    };

    function error(err) {
      alert('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
	  
    
	
	});
		
		
		$scope.item= [{name:"name1"},{name:"name2"},{name:"name3"},{name:"name3"}];
		$scope.datalist=[];
		$scope.msg=[];
		$scope.user=[];
		
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
		 function send(coords)
      {
	  
	  
		console.log("insend");
		$http.post('http://thawing-cliffs-9435.herokuapp.com/feed', coords).success(function(result){
		console.log("good12"+result.data[1]);
		
		console.log(result.data+"dwq");
		$scope.feedat=result.data;
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

app.controller('ProfileCtrl',function($scope, auth, $state, store,$http,$timeout,$window) {
	
	
  $scope.logout=function ()
 {
	console.log('removed');
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
   
	window.location.reload();
  
  

};
 $state.go('tab.login', {}, {reload: true});

 });
 
 



app.controller('LoginCtrl', function($scope, auth, $state, store, $http, $stateParams, $window) {

  $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
});

$state.forceReload();

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
      //$state.go(map);
	  //$location.path('/map');
    }, function(error) {
      console.log("There was an error logging in", error);
	  console.log(JSON.stringify(error));
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();
  
  
});
