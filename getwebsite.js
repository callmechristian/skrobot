exports.getWeb = function () {
  var request = require('ajax-request');
  var target = 'http://www.sotruefacts.com/rule/1';
  var content;

//  $.getJSON('https://uselessfacts.net/',function(data) {
//  console.log(data);
//});


//  var xmlhttp = new XMLHttpRequest();
//xmlhttp.onreadystatechange = function() {
  //  if (target.readyState == 4 && target.status == 200) {
  //      myObj = JSON.parse(target.responseText);
  //      document.getElementById("demo").innerHTML = myObj.name;
  //  }
//};
//xmlhttp.open("GET", "json_demo.txt", true);
//xmlhttp.send();



};

exports.displayCONTENT = function() {
    var request = require('ajax-request');
    var xmlhttp = new XMLHttpRequest();
    var target = 'http://www.sotruefacts.com/rule/1';
    var content;
    xmlhttp.onreadystatechange = function() {
        if (target.readyState == 4 && target.status == 200) {
            content = target.responseXML;
            return 'it worked';
        };
    };
};
