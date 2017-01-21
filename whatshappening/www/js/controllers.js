var app = angular.module('whatshappening.controllers', []);

app.controller('MainCtrl', function ($scope) {

});

app.controller('ListCtrl', function ($scope) {

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
    console.log("LoginCtrl::login");
    if (form.$valid) {
      // call backend function
    } else {
      console.log("Invalid form");
    }
  };
});
