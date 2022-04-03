exports.sdate= function() {
  var dtxt = [];
  var _inter;
  var _ret;
  //return JSON.stringify(Date()).substring(1,25);

  for ( i=0,j=1,a=0;i<42;i++) {
    if (JSON.stringify(Date()).substring(i,i+1).indexOf(' ') === 0) {
      dtxt[a] = '_' + JSON.stringify(Date()).substring(j,i);
      j=i+1;
      a++;
    } else {
      if (JSON.stringify(Date()).substring(i,i+1).indexOf(':') === 0) {
        dtxt[a] = '_' + JSON.stringify(Date()).substring(j,i);
        j=i+1;
        a++;
      }
    }
    if (JSON.stringify(Date()).substring(i,i+3).indexOf('GMT') === 0){
      break;
    }
  }
  _inter = ''
  for (i=0;i<7;i++) {
    _ret = _inter + dtxt[i]
    _inter = _ret;
  }
  return _ret;

}

exports.sdatent= function() {
  var dtxt = [];
  var _inter;
  var _ret;
  //return JSON.stringify(Date()).substring(1,25);

  for ( i=0,j=1,a=0;i<42;i++) {
    if (JSON.stringify(Date()).substring(i,i+1).indexOf(' ') === 0) {
      dtxt[a] = '_' + JSON.stringify(Date()).substring(j,i);
      j=i+1;
      a++;
    } if (JSON.stringify(Date()).substring(i,i+3).indexOf('GMT') === 0){
      break;
    }
  }
  _inter = ''
  for (i=0;i<4;i++) {
    _ret = _inter + dtxt[i]
    _inter = _ret;
  }
  return _ret;

}

  //var txtlog = message.content.substring(0); //deprecated
exports.createLog= function(date) {
  var fs = require('fs');
fs.writeFile("log", message.author.tag + message.content.substring(0), function(err) {
    if(err) {
        return console.log(err);
    }
})

    console.log(message.author.tag + " " + message.content.substring(0));
}

exports.getFilesizeInBytes = function(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}
