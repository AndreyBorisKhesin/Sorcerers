var app = angular.module('whatshappening.controllers', []);


app.controller('MainCtrl', function ($scope) {
  console.log("App initialized");
});


app.controller('ListCtrl', function ($scope, $ionicLoading, ListService) {
  console.log("Loading ListCtrl");
  $ionicLoading.show({template:'Loading feed...'});

  $scope.content = ListService;
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
    // var geocoder = new google.maps.Geocoder();
    //
    // var event_lat = 0;
    // var event_lon = 0;
    //
    // var destination = [event_lat, event_lon];
    // var source = [ListService.lat, ListService.lon];

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
    } else {
      console.log("Invalid form");
    }
  };
});
