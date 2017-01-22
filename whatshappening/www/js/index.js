window.alert("OKAY");

function submitClick() {

  var eventName = document.getElementById("eventName").value;
  var venue = document.getElementById("venue").value;
  var eventAddress = document.getElementById("eventAddress").value;
  var description = document.getElementById("description").value;
  var startTime = document.getElementById("startTime").value;
  var endTime = document.getElementById("endTime").value;
  var password = document.getElementById("password").value;
  var firebaseRef = firebase.database().ref();
  window.alert(eventName+"MWAHAHAHAHA"); // for checking
  firebaseRef.child("child").set("text");
}

function readClick() {
  var firebaseRef = firebase.database().ref();
  firebase.database().ref("users").on("value", function(snapshot) {
    window.alert(snapshot.val());
  });
}
