$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "happnings.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function loadData(happeningsFile){
  /*
  Read the *csv file happenings and return a list of list of happenings.
  Except javascript doesn't really do classes, so this is kind of tricky
  to deal with.
  */
  var allTextLines = allText.split(/\r\n|\n/);
  var happenings = [];
  var lengthOfRow = allTextLines[0].split(',').length();

  for (var i = 1; i < allTextLines.length(); i++){
    var currentEvent = allTextLines[i].split(',');

    if (currentEvent.length() == lengthOfRow){
      var happeningInfo = [];
      for (var j = 0; j < lengthOfRow; j++){
        happeningInfo.push(currentEvent[j]);
      }
      happenings.push(happeningInfo);
    }

  }
  return happenings;
}
