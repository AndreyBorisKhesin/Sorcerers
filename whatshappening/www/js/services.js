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
    self.events = [];
	firebase.database().ref("events").on("value", function(snapshot) {
    		snapshot.forEach(function(childSnapshot) {
    			self.events.push(childSnapshot.val());
		});
	});
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

  self.getCoordinates = function (string_lit, callback) {
    console.log("coords called");
    var coordinates;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: string_lit }, function (results, status) {
      coord_obj = results[0].geometry.location;
      console.log("coords reached");
      coordinates = [coord_obj.lat(), coord_obj.lng()];
      callback(coordinates);
    });
  };

  return self;
});
