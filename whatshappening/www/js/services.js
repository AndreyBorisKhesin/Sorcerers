var app = angular.module('whatshappening.services', []);

app.factory('ListService', function ($q, $cordovaGeolocation, $ionicPopup) {

  var self = {
    // List of events extracted by Firebase
    'events': [
      // Temp list of events for testing purposes
    ],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'lat': 0,
    'lon': 0
  };

  self.refresh = function() {
    self.events = [];
    self.page = 1;
    self.isLoading = false;
    self.hasMore = true;
    return self.loadEvents();
  };

  self.loadEvents = function () {
    // TODO: Firebase extract array of events

    self.isLoading = true;
    var defer = $q.defer();

    ionic.Platform.ready(function() {
      $cordovaGeolocation
        .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
        .then(function (position) {

          self.lat = position.coords.latitude;
          self.lon = position.coords.longitude;

        }, function (err) {

          console.error("Error getting position");
          console.error(err);
          $ionicPopup.alert({
            'title':'Switch on geolocation.',
            'template': 'It seems like you have switched off geolocation.'
          });
        })
    });

    // Temp code for testing
    var event1 = {id: 1, name:"badminton", location:"Athletic Centre", address:"55 Harbord St., Toronto",
      description:"Play some badminton", start:"1914-12-20 08:30:45", end:"1914-12-20 08:40:35",
      password:"meow"};
    var event2 = {id: 2, name:"chess", location:"Hart House", address:"7 Hart House Cir., Toronto",
      description:"Play some chess", start:"1916-12-20 08:30:45", end:"1916-12-20 08:40:35",
      password:"meow"};
    self.events.push(event1, event2);
    defer.resolve(self.events);

    return defer.promise;
  };

  self.getEvent = function (id) {
    for (var i = 0; i < self.events.length; i++) {
      var entry = self.events[i];
      if (entry.id == id) {
        return entry;
      }
    }
    return null;
  };

  return self;
});
