var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const ytdl = require('ytdl-core');
var _startConvert = false;
var _playCount = 0;
var _readyToPlay;

//get mp4
_link = 'https://www.youtube.com/watch?v=CZlfbep2LdU';
ytdl(_link, { filter: function(format) { return format.container === 'mp4'; } })
  .pipe(fs.createWriteStream('musicx/video' + _playCount + '.mp4'))
  .on("end", function() {
 });

//convert to mp3
stream = ytdl(_link);

proc = new ffmpeg({source:stream})
proc.setFfmpegPath('ffmpeg')
proc.saveToFile('musicx/audio' + _playCount + '.mp3', function (stdout, stderr) {
            console.log('complete.');
          }
        )
  proc.on("end", function() {
    const dispatcher = connection.playFile('musicx/audio' + _playCount + '.mp3');
  })
//play converted mp3
if (isReady && message.content.indexOf('//lpyt ') > -1) {

    var _url = message.content.substring(7);
    message.member.voiceChannel.join().then(connection =>{
        streamYT.toMp3(_url)
        const dispatcher = connection.playFile('musicx/audio' + streamYT.playCount + '.mp3');
      dispatcher.on("end", end => {
        message.member.voiceChannel.leave();
      });
    }).catch(err => console.log(err));

}

/*
  var proc = new ffmpeg({
      source: 'musicx/video.mp4' //using 'stream' does not work
  })
      .setFfmpegPath("ffmpeg")
      .withAudioCodec('libmp3lame')
      .toFormat('mp3')
      .saveToFile('musicx/output.mp3', function(stdout, stderr) {
          console.log('file has been converted succesfully');
      });
*/ // slow version, downloads mp4 then converts
