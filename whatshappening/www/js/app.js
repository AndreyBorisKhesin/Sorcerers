var app = angular.module('whatshappening', [
  'ionic',
  'ngMap',
  'ngCordova',
  'whatshappening.controllers',
  'whatshappening.services'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

    // Main page
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })

    .state('list', {
      url: '/list',
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    })

    .state('details', {
      url: '/details',
      templateUrl: 'templates/details.html',
      controller: 'DetailsCtrl'
    })

    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })

    .state('event', {
      url: '/event',
      templateUrl: 'templates/event.html',
      controller: 'EventCtrl'
    })

  ;

  // Default route
  $urlRouterProvider.otherwise('/main');

});
