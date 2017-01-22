var app = angular.module('whatshappening.services', []);

app.factory('ListService', function ($q, $cordovaGeolocation, $ionicPopup) {

  var self = {
    'events': [],
    'page': 1,
    'isLoading': false,
    'lat': 0,
    'lon': 0
  };

  self.refresh = function() {
    self.events = [];
    self.page = 1;
    self.isLoading = false;
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
          // $ionicPopup.alert({
          //   'title':'Switch on geolocation.',
          //   'template': 'It seems like you have switched off geolocation.'
          // });
        })
    });

    // Make sure that the events are cleared before we generate them
    self.events = [];

    // Array to be sorted.
    var temp_array = [];

    firebase.database().ref("events").on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var entry = childSnapshot.val();
            //Add the key
            entry.id = childSnapshot.key;
            temp_array.push(entry);
        });
    });



    for (i = 0; i < temp_array.length; i++) {
      self.events[i] = temp_array[i];
    }

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

  self.getCoordinates = function (string_lit) {
    var defer = $q.defer();
    var coordinates;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: string_lit }, function (results, status) {
      coord_obj = results[0].geometry.location;
      coordinates = [coord_obj.lat(), coord_obj.lng()];
      defer.resolve(coordinates);
    });
    return defer.promise;
  };

  return self;
});
