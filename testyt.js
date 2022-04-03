  var _playCount = 0;

module.exports.toMp3 = function(_link, _returnVar){
  var ffmpeg = require('fluent-ffmpeg');
  const fs = require('fs');
  const ytdl = require('ytdl-core');
  var _ready = true;

  if(!_returnVar) {
    _ready = false;
    console.log('converted: ' + _ready)
    //get mp4
    //test_link = 'https://www.youtube.com/watch?v=CZlfbep2LdU';
    ytdl(_link, { filter: function(format) { return format.container === 'mp4'; } })
      .pipe(fs.createWriteStream('musicx/video' + _playCount + '.mp4'))

   //convert to mp3
    stream = ytdl(_link);

    proc = new ffmpeg({source:stream})
    proc.setFfmpegPath('ffmpeg')
    proc.saveToFile('musicx/audio' + _playCount + '.mp3', function (stdout, stderr) {
                console.log('complete.');
              }
            )
    _ready = true;
    console.log('converted: ' + _ready)
  } else {
    return {
      queue: _playCount,
      readyState: _ready
    };
  }
}

module.exports.playNext = function() {
  _playCount++;
  return _playCount;
}

module.exports.reset = function() {
  _playCount = 0;
  return;
}
