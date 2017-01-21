var app = angular.module('whatshappening', [
  'ionic',
  'ngMap',
  'ngCordova',
  'whatshappening.controllers',
  'whatshappening.services'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
    templateUrl: 'templates/main/main.html',
    controller: 'MainCtrl'
  })

  ;

  // Default route
  $urlRouterProvider.otherwise('/main');

});
