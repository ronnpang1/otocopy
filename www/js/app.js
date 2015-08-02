// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers','auth0','angular-storage',
  'angular-jwt', 'leaflet-directive','ngCordova','cloudinary'])
  
  .run(function($ionicPlatform,$cordovaGeolocation, geoLocation) {
  $ionicPlatform.ready(function() {
  console.log("platform ready");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	
	
	
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
	

	
	
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
	
	var options2 = {
                frequency: 1000,
                timeout: 3000,
                enableHighAccuracy: true
            };
	
	  /*$cordovaGeolocation
                .getCurrentPosition(options2)
                .then(function (position) {
					console.log("setting geo");
                    geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude)
                }, function (err) {
                    geoLocation.setGeolocation(45, -122.09);
					console.log("error");
                });

            // begin a watch
            var options = {
                frequency: 1000,
                timeout: 3000,
                enableHighAccuracy: true
            };

            var watch = $cordovaGeolocation.watchPosition(options);
            watch.promise.then(function () { /* Not  used 
                },
                function (err) {
                    geoLocation.setGeolocation(37.38, -122.09)
                }, function (position) {
                    geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude)
                });*/

	
	
	
	
  });
})


.config(function($stateProvider, $urlRouterProvider, authProvider,
  jwtInterceptorProvider, $httpProvider, $provide, $ionicConfigProvider, $compileProvider) {
  
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);



    $ionicConfigProvider.tabs.position('bottom');
	

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
	.state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    
      
  .state('tab.login', {
    url: "/login",
    views:{
    'tab-login': {
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
	}
}
  })
  
      
  .state('tab.profile', {
    url: "/profile",
    views:{
    'tab-profile': {
    templateUrl: "templates/profile.html",
    controller: 'ProfileCtrl'
	}
}
  })

    // the pet tab has its own child nav-view and history
    .state('tab.map-index', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/map-index.html',
          controller: 'MapIndexCtrl'
        }
      },
	  
	   data: {
      requiresLogin: true
    },
      reload: true
    })


    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    
     .state('tab.feed', {
      url: '/feed',
      views: {
        'tab-feed': {
          templateUrl: 'templates/feed.html',
          controller: 'feedCtrl'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');
  
  //auth provider inititalizer
  
   authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
	callbackURL: AUTH0_CALLBACK_URL,
	loginState: 'tab.login'
  });
  
  //event listener for login success
  //will redirect to tab.feed
  
  authProvider.on('loginSuccess', function($state, $timeout) {
  $timeout(function() {
      $state.go('tab.feed');
  });
})

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (!idToken || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }

  });
});

  
  



