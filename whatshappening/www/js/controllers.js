var app = angular.module('whatshappening.controllers', []);


app.controller('MainCtrl', function ($scope) {
	// console.log(firebase.database().ref("events").orderByChild("startTime").limitToFirst(25));
	// firebase.database().ref("events").on("value", function(snapshot) {
	// 	snapshot.forEach(function(childSnapshot) {
	// 		var childData = childSnapshot.val();
	// 		console.log(childData);
	// 	});
	// });
	console.log("App initialized");
});


app.controller('ListCtrl', function ($scope, $ionicLoading, ListService) {
  console.log("Loading ListCtrl");
  $ionicLoading.show({template:'Loading feed...'});
  $scope.content = ListService;

  // $scope.content.getCoordinates("7 Hart House Cir., Toronto", function (coordinates) {
  //   console.log(coordinates[0]);
  //   console.log(coordinates[1]);
  // });

  $scope.doRefresh = function() {
    if (!$scope.content.isLoading) {
      $scope.content.refresh().then(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  };
  $scope.content.loadEvents().then(function() {
    $ionicLoading.hide();
  });

  $scope.doRefresh = function() {
    $scope.content.loadEvents().then(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
});


app.controller('DetailsCtrl', function ($scope, $stateParams, ListService) {
  console.log("Loading DetailsCtrl");
  console.log($stateParams);
  $scope.eventID = $stateParams.id;
  $scope.event = ListService.getEvent($scope.eventID);

  $scope.getDirections = function (event) {
    // TODO: finish
    launchnavigator.navigate(event.address);

  };
});


app.controller('EventCtrl', function ($scope) {
  $scope.formData = {
    "name": "",
    "location": "",
    "address": "",
    "description": "",
    "start": "",
    "end": "",
    "password": ""
  };

  $scope.create = function (form) {
    console.log("EventCtrl create event called");
    if (form.$valid) {
      // TODO: call Firebase add event function
      console.log(form.start);
      console.log(form.end);

      var eventName = document.getElementById("eventName").value;
      var venue = document.getElementById("venue").value;
      var eventAddress = document.getElementById("eventAddress").value;
      var description = document.getElementById("description").value;
      var startTime = document.getElementById("startTime").value;
      var endTime = document.getElementById("endTime").value;
      var password = document.getElementById("password").value;
      var ref = firebase.database().ref("events");
      var msg = ref.push();
      msg.set({
          name: eventName,
          location: venue,
          address: eventAddress,
          description: description,
          start: startTime,
          end: endTime,
          password: password
	});
    } else {
      console.log("Invalid form");
    }
  };
});
