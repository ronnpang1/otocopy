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

.factory('$geolocation', function($rootScope,$q) {
    this.get = function() {
      var deferred = $q.defer();
 
      // Call Geolocation API.
      navigator.geolocation.getCurrentPosition(
        function(result) {
          // Call successful.
          deferred.resolve(result);
          $rootScope.$apply();
        },
        function(error) {
          // Something went wrong.
          deferred.reject(error);
        }
      );
 
      // Return a promise.
      return deferred.promise;          
    };
 
    return this;
  })
  
.factory('geoparser',['$geolocation','$http', function($geolocation,$http,$modalInstance) {
  // Might use a resource here that returns a JSON array
  var datalist=[];
   
  test1='q';
  $geolocation.get().then(function(position)
			   {
				   
				   
				   coords = {};
				   coords.lat=position.coords.latitude;
				   coords.lng=position.coords.longitude;
				   console.log(position);
				   send(coords);
				  
			   });
			   
			   
	function send(coord)
      {
		console.log(coord.lat+"method1");
		$http.post('https://thawing-cliffs-9435.herokuapp.com/feed', coord).success(function(data){
		console.log("good1"+data);
		console.log("good123"+data.data[1].msg);
		test1='r';
		this.datalist=data;
		
		}).error(function(){
		console.log("well shit");
		});  
		  
	  
	  		}
	  		
	  		console.log("modial"+datalist);   
	
 

  return {
    set: function(coords) {
		
		console.log(coord.lat+"method1");
		$http.post('https://thawing-cliffs-9435.herokuapp.com/feed', coord).success(function(data){
		console.log("good1"+data);
		console.log("good123"+data.data[1].msg);
		test1='r';
		datalist=data;
		}).error(function(){
		console.log("well shit");
		});  
		
      
    },
	
	getfeed:function()
	{
	console.log(datalist+" "+"from server");
	return datalist;
	}
		
	
    
  }
  
  
}])






