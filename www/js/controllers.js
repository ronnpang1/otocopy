var app = angular.module('starter.controllers', ["leaflet-directive","ngFileUpload","ionic"]);


// FUCK
//controllers for states
//most of the controllers have already been binded dynamically in app.js
  app.controller("MapIndexCtrl", [ "$scope", "leafletData",'$geolocation','$http','$state', '$stateParams','$window','auth','Camera','Upload','video','$compile','$ionicModal','geoLocation',
  
  
  
  function($scope, leafletData, $geolocation, $http,$state, $stateParams, $window, auth,Camera, Upload,video,$compile,$ionicModal, geoLocation,$cordovaFileTransfer,$cordovaCapture,VideoService) 
  {
	
		
		
		 ionic.Platform.ready(function() {
			$scope.testlat=geoLocation.getGeolocation().lat;
			$scope.testlng=geoLocation.getGeolocation().lng;
			
			 
				  
			

			
			
			
			console.log($scope.testlat+"testlat");
			
		
		
	
	   $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
		   id:1;
        $scope.modaltext = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
	
	 $ionicModal.fromTemplateUrl('modalimg.html', function($ionicModal) {
		  id:2;
        $scope.modalimg = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
	
	 $ionicModal.fromTemplateUrl('modalvid.html', function($ionicModal) {
		  id:3;
        $scope.modalvid = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
	
	$scope.openModal = function(index) {
      if (index == 1) $scope.modaltext.show();
      if (index == 2) $scope.modalimg.show();
	  if (index == 3) $scope.modalvid.show();
	};

	$scope.closeModal=function(index) {
      if (index == 1) $scope.modaltext.hide();
      if (index == 2) $scope.modalimg.hide();
	  if (index == 3) $scope.modalvid.hide();
	};
				
			$scope.auth=auth;
			console.log($scope.auth.profile.email);
			$scope.layer='';
			$scope.master = {};
			$scope.lat= ' ';
			$scope.lng= ' ';
			$scope.rad=10;
			$scope.user = null;
			$scope.video=false;
			$scope.img=false;
			$scope.videourl='';
			$scope.imgurl='';
			$scope.loading='';
			
				//get location for map
				//assign centers to users current location
				//latitude and longitude are assgined to scope.center.lat and scope.center.lng
				//important to note that $geolocation is a service
				//refer to service.js to see this
				
            /*
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
				   

				  
			   },function(err){
			   console.log("cant parse mapdiv");
			   console.log(err.message);
			   });*/
			
			
			
   $scope.refresh= function()
   {
   
   $window.location.reload();
   
   }


	 
    // Called if something bad happens.
    //
    
$scope.captureVideo = function() {
 video.captureVideo().then(function(videoData) {
$scope.clip = videoData;
$scope.datatype="video";

 var path=window.resolveLocalFileSystemURL(videoData[0].localURL);
console.log(videoData);
console.log(videoData[0].fullPath);
console.log(path);

 }, function(err) {
      console.err(err);                         
    });
};
	
	
	$scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log("photo"+imageURI);
	    $scope.picData = imageURI;
		$scope.datatype="pic";
    }, function(err) {
      console.err(err);
    });
  };
   $scope.upload = function() {
  
   var myImg = $scope.picData;
   var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=myImg.substr(myImg.lastIndexOf('/')+1);
	var filename=myImg.substr(myImg.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    // these are the upload parameters - note that these are actually almost empty since we're not supplying any special upload
    // upload parameters. So the signature is really the result of signing your api_secret
    var params = {upload_preset: "lfwyku4h"};

    options.params = params;

    var ft = new FileTransfer();
	
		ft.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			$scope.loading  = perc + "% loaded...";
		} else {
			if($scope.loading == "") {
				$scope.loading  = "Loading";
			} else {
				$scope.loading  += ".";
			}
		}
	};
	
	ft.upload(myImg, encodeURI("https://api.cloudinary.com/v1_1/oto/upload"), win, fail, options);
	

	

console.log(myImg);
	 
		/*
        Upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + 'oto' + "/upload",
		   data: {upload_preset: 'lfwyku4h', tags: 'myphotoalbum', context:'photo=' + "test"},
		   skipAuthorization: true,
          file: filename,
		  fields: {
		  upload_preset: 'lfwyku4h'
          }
        })
			*/
		console.log("uploading");
   
      function win(r) {
          console.log("Code = " + r.responseCode.toString()+"\n");
          console.log("Response = " + r.response.toString()+"\n");
          console.log("Sent = " + r.bytesSent.toString()+"\n");
		  console.log($scope.picData);
		  $scope.img=true;
          alert("PHOTO UPLOADED!!");
		  var responses=JSON.parse(r.response);
		  console.log("responses"+responses.url);
		  $scope.imgurl=responses.url;
		  
		  
		 
		  console.log("imgurl"+$scope.imgurl);
      }

      function fail(error) {
          alert("An error has occurred: Code = " + error.code);
      }
   
   };
   

  $scope.uploadvideo=function()
  {
	  
	 
  
   var video = $scope.clip[0].fullPath;
   var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=video.substr(video.lastIndexOf('/')+1);
    options.mimeType="video/mp4";

    // these are the upload parameters - note that these are actually almost empty since we're not supplying any special upload
    // upload parameters. So the signature is really the result of signing your api_secret
    var params = {upload_preset: "lfwyku4h"};

    options.params = params;

    var ft = new FileTransfer();
	
	ft.upload(video, encodeURI("https://api.cloudinary.com/v1_1/oto/upload"), win, fail, options);
	
	function win(r) {
          console.log("Code = " + r.responseCode.toString()+"\n");
          console.log("Response = " + r.response.toString()+"\n");
          console.log("Sent = " + r.bytesSent.toString()+"\n");
		  $scope.video=true;
          alert("VIDEO UPLOADED!!");
		  var responses=JSON.parse(r.response);
		  $scope.videourl=responses.url;
		  
		  
      }

      function fail(error) {
          alert("An error has occurred: Code = " + error.code);
      }
   
	  
	  
  }
	function mapmarker(lat,lng,$compile)
	{
		
		 var html='<button class= button" ng-click="refresh()" type = "button">  refresh </button>'
		 linkFunction = $compile(angular.element(html)),
    newScope = $scope.$new();
	
		

var marker = L.marker([lat, lng]).bindPopup(linkFunction(newScope)[0]);
		
		
	}
  
			
	  $scope.send= function (user,form,index)
      {
		
		var msg={};
		msg.text=user.msg;
		msg.lat=$scope.lat;
		msg.lng=$scope.lng;
		msg.rad=$scope.rad;
		msg.user=$scope.auth.profile.email;
		msg.media='text';
		msg.link='blank';
			if($scope.video)

		{
			
		msg.link=$scope.videourl;
		msg.media='video';	
		}
		if($scope.img)
		{
			
		msg.link=$scope.imgurl;
		msg.media='picture';
			
		}
	
		
		
		console.log(msg.rad+"RADIUS");
		console.log(msg.text +msg.lat);
		 leafletData.getMap().then(function(map) {
		 map.removeLayer($scope.layer);
		 user.msg='';
		form.$setPristine();
		$scope.user = null;
		$scope.closeModal(index);
		console.log(msg.media);
		 console.log(form);
		 });
		$http.post('https://thawing-cliffs-9435.herokuapp.com/addmsg', msg).success(function(data){
		console.log("good"+data);
		msg.media="";
		 //$window.location.reload();
		$state.go("tab.feed");
		}).error(function(){
		console.log("msg did not go thru");
		$scope.user = null;
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
		
		
				$scope.$on('leafletDirectiveMarker.popupopen', function (event, leafletEvent) {

console.log("event"+event);
            });
       
   

     
			   
			   
				   
				   
	  leafletData.getMap().then(function(map) {
		 
	
      var drawnItems = new L.featureGroup().addTo(map);
$scope.map.center.lat=geoLocation.getGeolocation().lat;
			$scope.map.center.lng=geoLocation.getGeolocation().lng;
    

		
      map.addControl(new L.Control.Draw({
		  draw:{
			rectangle:false,
			polygon: false,
			
			
		polyline:false
			   },
		  
		  
        edit: {featureGroup: drawnItems }
      }));
	  //event layer for when map is drawn
      map.on('draw:created', function (event) {
			  map.removeLayer($scope.layer);
		  
		  
		  //function called map.on takes argument event
		  //assign layer to event.layer for easier manipulation
		  //assign scope variable to it for later removal
          var layer = event.layer;
		  $scope.layer=layer;
			
		  
		 
		 
		  var layer = event.layer;
		  $scope.layer=layer;
		  drawnItems.addLayer(layer);
		  console.log(layer);
		  
		  // if the circle is the layer, get the radius, center latitiude, center longitude
		    if (layer instanceof L.Circle) {
			console.log("circle");
    
		  var myIcon = L.divIcon({className: 'my-div-icon'});

          console.log(JSON.stringify(layer.toGeoJSON()));
          console.log(JSON.stringify(layer.getRadius()));
          console.log(JSON.stringify(layer.getLatLng().lat));
          var msgcoor= {};
		 var html='<button  ng-click="refresh()" class="button button-balanced">  refresh </button>'+
			'&nbsp'+'&nbsp'+
		 '<button  ng-click="openModal(2)" class="button button-balanced">  photo </button>'+ 
		   '&nbsp'+'&nbsp'+
		  '<button ng-click="openModal(3)" class="button button-balanced">video</button>'
			+ '&nbsp'+'&nbsp'+
			'<button ng-click="openModal(1)" class="button button-balanced">text</button>'

          $scope.lat=layer.getLatLng().lat;
          $scope.lng=layer.getLatLng().lng;
          $scope.rad=layer.getRadius();
		   $scope.map.markers.now = {
              lat:$scope.lat,
              lng:$scope.lng,
              message: html,
			  getMessageScope: function() { return $scope; },         
              focus: true,  
              draggable: false
            };
		 
		
          console.log("msgcoord"+ layer.getLatLng().lng);
          msgcoor.rad=JSON.stringify(layer.getRadius());
          msgcoor.lat=JSON.stringify(layer.getLatLng().lat);
          msgcoor.lng=JSON.stringify(layer.getLatLng().lng);
		  
		    
		  
          console.log(msgcoor.rad);
		  }
		  
      });
      
      
      
      //http post to server
      

       });
         });
	   
       }
	   
	   ]);

// A simple controller that shows a tapped item's data
app.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
  
});





app.controller('feedCtrl',["$scope",'$http','$cordovaGeolocation','$ionicPlatform','$state','$stateParams','auth','$ionicModal','geoLocation',function($scope, $http, $cordovaGeolocation,$ionicPlatform,$state, $stateParams,auth,$ionicModal,geoLocation) {
			 
			 ionic.Platform.ready(function() {
			$scope.usrcoord={};
		$scope.usrcoord.lat='';
		$scope.usrcoord.lng='';
			$scope.usrcoord.lat=geoLocation.getGeolocation().lat;
			$scope.usrcoord.lng=geoLocation.getGeolocation().lng;
		
			  
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
		if(($scope.usrcoord.usrlat == '') || ($scope.usrcoord.usrlat == '')){
		
			$scope.usrcoord.lat=geoLocation.getGeolocation().lat;
			$scope.usrcoord.lng=geoLocation.getGeolocation().lng;
			
			
			
		}
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

app.controller('ProfileCtrl',function($scope, auth, $state, store,$http,$timeout,$window) {
	
	$scope.auth = auth;
	

  $scope.logout=function ()
 {
	console.log('removed');
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
   
	$window.location.reload();
	
	
	
  
  

};


$scope.inbox= function () {
		$scope.inboxlist=[];
		var userprofile={};
		userprofile.username=$scope.auth.profile.email;
		console.log(userprofile.username+"inbox user");
		$http.post('http://thawing-cliffs-9435.herokuapp.com/inboxfeed',userprofile).success(function(result){
			  
			 for(var i=0;i<result.data1.inbox.length;i++)
			 {
		
			   $scope.inboxlist.push(result.data1.inbox[i]);
			 }
			   })
			   
			   
			   }
			   
			   	$scope.inbox();


 $state.go('tab.login', {}, {reload: true});

 });
 
 



app.controller('LoginCtrl', function($scope, auth, $state, store, $http, $stateParams, $window) {

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
