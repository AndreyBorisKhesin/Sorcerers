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

    self.isLoading = true;
    var defer = $q.defer();

    ionic.Platform.ready(function() {
      $cordovaGeolocation
        .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
        .then(function (position) {

          self.lat = position.coords.latitude;
          self.lon = position.coords.longitude;
        })
    });

    // Make sure that the events are cleared before we generate them
    self.events = [];

    // Array to be sorted.
    var temp_array = [];

    firebase.database().ref("events").on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var entry = childSnapshot.val();
            // Add the key
            entry.id = childSnapshot.key;
            temp_array.push(entry);
        });
    });
	
	var lat1 = 43.6596654//self.lat;
	var lon1 = -79.3967752//self.lon;
	console.log(""+lat1+"        "+lon1+Math.PI);

	for (i = 0; i < temp_array.length; i++) {
		min_d = 1000000000;
		min = -1;
		for (j = i; j < temp_array.length; j++) {
			var lat2 = 0;
			var lon2 = 0;

			lat2 = temp_array[j].lat;
			lon2 = temp_array[j].lon;
			console.log(temp_array.length+"         "+lat2+"         "+lon2);

			var R = 6371e3; // metres
			var p1 = (Math.PI / 180.0) * (lat1);
			var p2 = (Math.PI / 180.0) * (lat2);
			var dp = (Math.PI / 180.0) * (lat2-lat1);
			var dl = (Math.PI / 180.0) * (lon2-lon1);
			
			var a = Math.sin(dp/2) * Math.sin(dp/2) +
			        Math.cos(p1) * Math.cos(p2) *
       			 	Math.sin(dl/2) * Math.sin(dl/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		
			var d = R * c;
			if (d < min_d) {
				min_d = d;
				min = j;
			}
		}
		var temp = temp_array[i];
		temp_array[i] = temp_array[min];
		temp_array[min] = temp;
	}

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

//  self.delete = function ()

  return self;
});
