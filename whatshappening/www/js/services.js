var app = angular.module('whatshappening.services', []);

app.factory('ListService', function ($q) {

  var self = {
    // List of events extracted by Firebase
    'events': [
      // Temp list of events for testing purposes
    ]
  };

  self.loadEvents = function() {
    // TODO: Firebase extract array of events

    // Temp implementation for testing
    var defer = $q.defer();

    var event1 = {name:"badminton", location:"Athletic Centre", address:"55 Harbord St., Toronto",
                  description:"Play some badminton"};
    var event2 = {name:"chess", location:"Hart House", address:"7 Hart House Cir., Toronto",
      description:"Play some chess"};
    self.events.push(event1, event2);
    defer.resolve(self.events);

    return defer.promise;
  };

  return self;
});
