var app = angular.module('whatshappening.controllers', []);


app.controller('MainCtrl', function ($scope) {

});


app.controller('ListCtrl', function ($scope, $ionicLoading, ListService) {
  console.log("Loading ListCtrl");
  $ionicLoading.show({template:'Loading feed...'});

  $scope.content = ListService;
  $scope.content.loadEvents().then(function() {
    $ionicLoading.hide();
  });

  $scope.doRefresh = function() {
    $scope.content.loadEvents().then(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
});


app.controller('DetailsCtrl', function ($scope) {

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
