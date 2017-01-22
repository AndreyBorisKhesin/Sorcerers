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
    var consider = [];

    firebase.database().ref("events").on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var entry = childSnapshot.val();
            // Add the key
            entry.id = childSnapshot.key;
            temp_array.push(entry);
	    consider.push(true);
        });
    });

	var lat1 = self.lat;
	var lon1 = self.lon;

	for (i = 0; i < temp_array.length; i++) {

		min_d = 1000000000;
		min = -1;
		for (j = i; j < temp_array.length; j++) {
			var lat2 = temp_array[j].lat;
			var lon2 = temp_array[j].lon;

			var R = 6371e3; // metres
			var p1 = (Math.PI / 180) * (lat1);
			var p2 = (Math.PI / 180) * (lat2);
			var dp = (Math.PI / 180) * (lat2-lat1);
			var dl = (Math.PI / 180) * (lon2-lon1);

			var a = Math.sin(dp/2) * Math.sin(dp/2) +
			        Math.cos(p1) * Math.cos(p2) *
       			 	Math.sin(dl/2) * Math.sin(dl/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

			var d = 0.72 * R * c;
			
			var dt = 18 * d / 25 //self.getTravel(lat1, lon1, lat2, lon2)[0];

			var timeUntil = self.getDiff(temp_array[j].start);
			var timeUntilOver = self.getDiff(temp_array[j].end);
			if (dt > timeUntilOver) {
				consider[j] = false;
			} else if (dt < timeUntil) {
				d = timeUntil;
			} else {
				d = 2 * dt - timeUntil;
			}
			if (d < min_d) {
				min_d = d;
				min = j;
			}
		}
		var temp1 = temp_array[i];
		var temp2 = consider[i];
		temp_array[i] = temp_array[min];
		consider[i] = consider[min];
		temp_array[min] = temp1;
		consider[min] = temp2;
	}

	for (i = 0; i < temp_array.length; i++) {
		if (consider[i]) {
			self.events.push(temp_array[i]);
		}
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

	self.getTravel = function (lat1, lon1, lat2, lon2) {
		var origin = new google.maps.LatLng(lat1, lon1);
		var destination = new google.maps.LatLng(lat2, lon2);

		var directionsService = new google.maps.DirectionsService();
		var request = {
			origin: origin, // LatLng|string
			destination: destination, // LatLng|string
			travelMode: google.maps.DirectionsTravelMode.WALKING
		};
		console.log(lat1);

		directionsService.route(request, function(response, status) {
		if (status === "OK") {
			var point = response.routes[0].legs[0];
			return [point.duration.text, point.distance.text];
		}});
	}

	self.getTravel1 = function (lat1, lon1, lat2, lon2) {
/*		var directions = new GDirections();
		var wp = new Array();
		wp[0] = new GLatLng(lat1, lon1);
		wp[1] = new GLatLng(lat2, lon2);
		directions.loadFromWaypoints(wp);
		GEvent.addListener(directions, "load", function() {
			return [directions.getDuration().seconds,
				directions.getDistance().metres / 1000];
		});*/return [6,8];
	};

  self.getDiff = function (time) {
    var diff = (Date.parse(time) - new Date().getTime()) / 1000;
    return diff;
  };

  return self;
});
