angular.module('starter.services', [ ])

/**
 * A simple example service that returns some data.
 */
.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
})

.service('VideoService', function($q) {
		var deferred = $q.defer();
var promise = deferred.promise;
 
promise.success = function(fn) {
 promise.then(fn);
 return promise;
}
promise.error = function(fn) {
 promise.then(null, fn);
 return promise;
}


    // TBD
})

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])


.factory('video', ['$q', function($q) {

  return {
    captureVideo: function(options) {
      var q = $q.defer();

      navigator.device.capture.captureVideo(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])


  .factory('$localStorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    
	.factory('geoLocation', function ($localStorage) {
        return {
            setGeolocation: function (latitude, longitude) {
                var _position = {
                    latitude: latitude,
                    longitude: longitude
                }
                $localStorage.setObject('geoLocation', _position)
            },
            getGeolocation: function () {
                return glocation = {
                    lat: $localStorage.getObject('geoLocation').latitude,
                    lng: $localStorage.getObject('geoLocation').longitude
                }
            }
        }
    })


.factory('$geolocation', function($rootScope,$q) {
    this.get = function() {
      var deferred = $q.defer();
 
      // Call Geolocation API.
      navigator.geolocation.getCurrentPosition(
        function(result) {
          // Call successful.
          deferred.resolve(result);
         
        },
        function(error) {
          // Something went wrong.
		  console.log(error);
		  console.log(error.message);
          deferred.reject(error);
        }
      );
 
      // Return a promise.
      return deferred.promise;          
    };
 
    return this;
  })
  
