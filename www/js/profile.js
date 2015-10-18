//profile controiller



angular.module('starter.controllers').controller('ProfileCtrl',['$ionicModal','auth','$scope','$state', 'store','$http','$timeout','$window',function($ionicModal, auth, $scope,$state, store,$http,$timeout,$window) {
	
	$scope.auth = auth;
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

  $scope.logout=function ()
 {
	console.log('removed');
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
   
	$window.location.reload();
	
	
	
  
  

};
console.log("test");


$scope.inbox= function () {
		$scope.inboxlist=[];
		var userprofile={};
		$scope.inboxlisttest={};
		userprofile.username=$scope.auth.profile.email;
		console.log(userprofile.username+"inbox user");
		$http.post('http://thawing-cliffs-9435.herokuapp.com/inboxfeed',userprofile).success(function(result){
			  $scope.inboxlisttest=result;
			 for(var i=0;i<result.data1.inbox.length;i++)
			 {
		
			   $scope.inboxlist.push(result.data1.inbox[i]);
			 }
			 
			 
			 console.log($scope.inboxlisttest.data1.inbox[1].sender+"testinbox");
			   })
			   
			   
			   }
			   
			   
			   
			   
			   	$scope.inbox();
				 
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
			

 

 }]);
 
 