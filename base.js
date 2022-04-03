const Discord = require('discord.js');
const client = new Discord.Client();
const user = new Discord.User();
var _presence;
var _game;
var _voicePresence;
var endOfLine = require('os').EOL;
var textcommand = require('./textcommands')
var log = require('./log');
const prefix = '//';
var getreq = require('./get_request');
var yt = require('./testyt.js');
//const embed = new Discord.RichEmbed();

var joke = require('./joke');
var responseType = 1;
var _byID;
var _jokeLoop = false;
var _jokeID;
var _phase;
var _fail = false;

client.on('message', message => {
  if (message.content === prefix + 'commands') {
    message.channel.send( textcommand.getHelp() );
    return;
  }
  //------------------------------------------------userinfo
  if (message.content === prefix + 'userinfo') {
    if (message.author.voiceChannel === undefined) {
      _voicePresence = 'not in channel';
    } else {
      _voicePresence = message.author.voiceChannel;
    }
    if (client.user.game === undefined) {
      _game = 'not ingame'
    } else {
      _game = client.user.game;
    }
    /*switch (message.author.status) {
      case 'offline':
        _presence = 'offline';
        break;
        case 'online':
        _presence = 'online';
        break;
        case 'idle':
        _presence = 'idle';
        break;
        case undefined:
        _presence = 'client.error(check, 1)'
        break;
      default: 'client.error(check)'

    }
    message.channel.send('Info request for user ' + '**' + message.author.tag + '**' + '...' + '\n' +
    '__Bot:__ ' + message.author.bot + '; ' + '\n' +
    '__Ingame:__ ' + message.author.presence.game + '; ' + '\n' +
    '__Currently:__ ' + message.author.presence.status + '; ' + '\n' +
    '__Channel:__ ' + message.author.voicestate + '; ' + '\n' +
    '__Avatarurl:__ ' + message.author.avatarURL + '; ' + '\n' +
    '__ID:__ ' + message.author.id + '; ' + '\n' +
    '__Birth:__ ' + message.author.createdAt + ';'
  ); */
  const embed = new Discord.RichEmbed()
  .setTitle("")
  .setAuthor(message.author.tag, message.author.avatarURL)
/*
 * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
 */
 .setColor([250, 256, 100])
 .setDescription("Known info for user...")
 .setFooter("This message was generated in request by the user ", message.author.avatarURL)
 //.setImage("http://i.imgur.com/yVpymuV.png")
 .setThumbnail(message.author.avatarURL)
/*
 * Takes a Date object, defaults to current date.
 */
 .setTimestamp()
 .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
 .addField("User Avatar Image (shown on the right)",
  "<" + message.author.avatarURL + ">")
/*
 * Inline fields may not display as inline if the thumbnail and/or image is too big.
 */
 .addField("Is BOT", JSON.stringify(message.author.bot), true)
 .addField("Status", message.author.presence.status, true)
 .addField("In voice channel", _voicePresence, true)
 .addField("In game", _game, true)
 .addField("ID", message.author.id, true)
 .addField("Typing", message.author.typingIn(message.channel), true)
/*
 * Blank field, useful to create some space.
 */
 //.addBlankField(true)
 .addField("Last Message", message.author.lastMessage)
 .addField("User since", message.author.createdAt)

 message.channel.send({embed});
  }
  //botinfo
  if (message.content === prefix + 'botinfo') {
    message.channel.send('I am Skrobot Alpha Build d47dcx.' + '\n' + 'Type //commands for a list of commands.');
  }
  //magic8ball
  var _8ballresponse = [];
  _8ballresponse[0] = 'It is certain.';
  _8ballresponse[1] = 'It is decidedly so.';
  _8ballresponse[2] = 'Without a doubt.';
  _8ballresponse[3] = 'Yes, definitely.';
  _8ballresponse[4] = 'You may rely on it.';
  _8ballresponse[5] = 'As I see it, yes.';
  _8ballresponse[6] = 'Most likely.';
  _8ballresponse[7] = 'Outlook good.';
  _8ballresponse[8] = 'Yes.';
  _8ballresponse[9] = 'Definitely.';
  _8ballresponse[10] = 'Of course.';
  _8ballresponse[11] = 'Better not tell you now.';
  _8ballresponse[12] = 'Cannot predict now.';
  _8ballresponse[13] = 'No.';
  _8ballresponse[14] = "Don't count on it.";
  _8ballresponse[15] = 'My reply is no.';
  _8ballresponse[16] = 'My sources say no.';
  _8ballresponse[17] = 'Outlook not so good.';
  _8ballresponse[18] = 'Very doubtful.';
  _8ballresponse[19] = 'Signs point to yes..';
  if (!message.author.bot) {
    if (message.content === prefix + 'fortuneteller') {
      message.channel.send('Please ask a question. :)');
      return;
    } else {
      if ((message.content.indexOf('//fortuneteller') > -1)&&(message.content.indexOf('?') > -1)) {
        message.channel.send(_8ballresponse[getRandomInt(0,19)]);
        return;
      } else {
        if (message.content.indexOf('//fortuneteller') > -1) {
          message.channel.send("I can't predict what I can't understand. Ask a yes or no question.");
          return;
        }
      }
    }
  }
  //date time
  if (message.content === prefix + 'dt') {
    message.channel.send( textcommand.getDateTime() );
  }
  if (message.content === prefix + 'sdt') {
    message.channel.send( log.sdate() )
  }
  if (message.content === prefix + 'unicorns') {
    message.channel.send(':unicorn:');
  }
  if (message.content === prefix + 'bunnies') {
    message.channel.send(':rabbit:');
  }
  if (message.content === prefix + 'bunnies2') {
    message.channel.send(':rabbit2:');
  }
  //memes
  if (message.content === prefix + 'memes') {
    //yea fuck you memes
    /*
    var _url = 'https://www.memecenter.com/fun/7092079' + getRandomInt(1000000, 7092079)
    const embed = {
      "image": {
        "url": _url
      }
    };
    message.channel.send({ embed });
    */
  }
  //say
  if ( message.content.indexOf('//say') === 0 ) {
    var text = message.content.substring(6);
    message.channel.send(text);
  }
  //beautify
  var _notBeautified = [];
  var _beautified = [];
  var _niceText = '';

  if ( message.content.indexOf('//beautify') === 0 ) {
    var text = message.content.substring(10).toLowerCase();
    for (i=1;i<text.length;i++) {
      _notBeautified[i] = text.substring(i,i+1);
      //console.log('_notBeautified['+i+']' + _notBeautified[i]);
    }
    for (i=1;i<_notBeautified.length;i++) {
      _beautified[i] = textcommand.beautifyText(_notBeautified[i]);
      //console.log('_beautified['+i+']' + _beautified[i]);
    }
    for (i=1;i<_beautified.length;i++) {
      _niceText += _beautified[i];
      //console.log(_niceText)
    }
    message.channel.send(_niceText);
  }
  //invert message
  if ( message.content.indexOf('//invert') === 0 ) {
    var _reversed = '';
    var text = message.content.substring(9);
    var i = text.length;
    while (i > 0) {
       _reversed += text.substring(i - 1, i);
        i--;
    }
    message.channel.send(_reversed);
  }
  //joke by id
    if (message.content.indexOf('//jokeid') === 0) {
      message.channel.send('Knock, knock.');
      _byID = true;
      _jokeLoop = true;
      _jokeID = message.content.substring(9);
      _phase = 1;
      return;
      //if (message.author.bot) return;
    }
    if (_jokeLoop) {
      if(message.author.bot) return;
      console.log('asd');
      if (((message.content.toLowerCase().indexOf('who') > -1) && (message.content.toLowerCase().indexOf('there') > -1)) && (_phase == 1)) {
        //if (message.author.bot) return;
        console.log('hello')
        message.channel.send( joke.knockJoke(_jokeID,1) );
        _phase = 2;
        return;
      }
      if ((message.content.indexOf('who') > -1)&&(_phase == 2)) {
        if (message.author.bot) return;
        message.channel.send( joke.knockJoke(_jokeID,2));
        _jokeLoop = false;
        _phase = 1;
        return;
      } else {
          if(_fail) {
            message.channel.send("Okay, then... no joke...");
            _fail = false;
            _jokeLoop = false;
            _phase = 1;
            return;
          } else {
            message.channel.send("I don't think you know how the joke works... try again.");
            _fail = true;
            return;
        }
      }
    }
});

//----------------------
client.on('ready', () => {
  console.log('I am here.');
});

//----------------------


//-----  log
client.on('message', message => {
  var txtlog = message.content.substring(0);
  var fs = require('fs');
//  if(fs.readFile() ) //check for log
  if (fs.existsSync("logs/log" + log.sdatent()) === false) {
    fs.writeFile("logs/log" + log.sdatent(), message.author.tag + txtlog, function(err) {
      if(err) {
          return console.log(err);
        }
      });
    } else {
      fs.appendFile("log" + log.sdatent(), '[' + log.sdate().substring(1) + ']' + message.author.tag + ':' +txtlog + '\n', function(err) {
        if(err) {
          return console.log(err);
        }
      });
    }
    console.log(message.author.tag + ": " + txtlog);
});

//bug report
var log = require('./log');
client.on('message', message => {
  if (message.content.substring(0,11) == '//bugreport') {
    message.channel.send('Bug report sent.')
  var txt_bug = message.content.substring(12);
  var fs = require('fs');
  if (fs.existsSync("bugs/bugreport" + log.sdatent()) === false) {
    fs.writeFile("bugs/bugreport" + log.sdate(), 'Author: ' + message.author.tag + '\n' + 'Submitted at: ' + dt.getDateTime() + '\n' + 'Issue: ' + txt_bug, function(err) {
      if(err) {
          return console.log(err);
        }
      });
    } else {
      fs.appendFile("log" + log.sdate(), '[' + log.sdate().substring(1) + ']' + message.author.tag + ':' +txtlog + '\n', function(err) {
        if(err) {
          return console.log(err);
        }
      });
    }
    console.log(log.sdate() + ' Bug report received.');
  }
});

//------------chatbot
var apiai = require('apiai');
var app = apiai("2379f3fab4cb4cf2abd4fd0e49c71782");
var request = app.textRequest('hi', {
    sessionId: 'session_test123'
});
var _jokeLoop = false;
var _fail = false;
var joke = require('./joke');  //jokes file
var _jokeID;

client.on('message', message => {

    // Check if the message starts with the `!` trigger \\\\\ message.content.indexOf('//') === 0 &&
    if ( message.content.substring(0,4) === '//c ' ) {
      // Get the user's message excluding the `!`
        var text = message.content.substring(4);
        // Reply to the user's message
        request = app.textRequest(text, {
          sessionId: 'session_test123'
        });
        request.on('response', function(response) {

            for ( i=0, j=9;i<600;i++,j++) {
              //console.log(JSON.stringify(response).substring(i,i+8))//debug
              if (JSON.stringify(response).substring(i,i+9).indexOf('speech":"') === 0) {
                //console.log('<---x--->');//debug
                //break;//debug
                for(t=j;t<600;t++) {
                  if (JSON.stringify(response).substring(t,t+20).indexOf('","messages":') === 0) {
                    //console.log('Skrobot: ' + JSON.stringify(response).substring(j,t)); //debug
                    if (JSON.stringify(response).substring(j,t).indexOf('<JOKE>') === 0) {
                      //jokes
                        message.channel.send( 'Knock, knock.' );
                        _jokeLoop = true;
                        _jokeID = getRandomInt(0, 48);
                        return;
                        //debug console.log(_jokeID);

                    } else {
                      if (message.content.indexOf('//c insult ') === 0) {
                        for ( k=0, l=3;k<600;k++,l++) {
                          //console.log(JSON.stringify(response).substring(i,i+8))//debug
                          if (JSON.stringify(response).substring(k,k+6).indexOf('<NAME>') === 0) {
                            console.log('<---x--->');//debug
                            //break;//debug


                                //console.log('Skrobot: ' + JSON.stringify(response).substring(j,t)); //debug
                                    message.channel.send(JSON.stringify(response).substring(j,k) + message.content.substring(11) + JSON.stringify(response).substring(k+6,t));
                                    return;
                                    //debug console.log(_jokeID)


                          }
                        }
                      } else {
                        message.channel.send(JSON.stringify(response).substring(j,t));
                        break;
                      }
                    }
                  }
                }
              }
            }

          //  console.log(response);
        });

        request.on('error', function(error) {
          console.log(error);
        });
        request.end();
    }
});



request.end();

//antispam
const util = require('util');
var _allowRun = false;
var _sameAuth = 0;
var msg_auth1;
var msg_auth2;
var msg_date1;
var msg_date2;

client.on('message', message => {
  //turn system on/off
  if ((message.content === prefix + 'antispam on') && (message.member.permissions.has('ADMINISTRATOR',true) === true)) {
    _allowRun = true;
    message.channel.send( 'AntiSpam system online.' );
  }
  if ((message.content === prefix + 'antispam off') && (message.member.permissions.has('ADMINISTRATOR',true) === true)) {
    _allowRun = false;
    message.channel.send( 'AntiSpam system offline.' );
  }
  //system
  if (_allowRun) {
    switch (_sameAuth) {
      case 0:
        msg_auth1 = message.author.username;
        msg_date1 = parseInt(JSON.stringify(message.createdAt).substring(18,20)); //18,24 to go milliseconds, you cheeky bastard
        console.log('[1]' + msg_date1);
        _sameAuth++;
        break;
        /*
      case '_deprecated':
        if((msg_auth1 == message.author.username) && (JSON.stringify(message.createdAt).substring(18,20) == msg_date1)) {
          msg_auth2 = message.author.username;
          msg_date2 = JSON.stringify(message.createdAt).substring(18,20);
          console.log('[2]' + msg_date2);
          _sameAuth++;
        } else {
          _sameAuth = 0;
          msg_auth1 = '';
          msg_date1 = '';
        }
        break;
        */
      case 1:
      if((msg_auth1 == message.author.username) && ((parseInt((JSON.stringify(message.createdAt).substring(18,20))) == msg_date1+1)||(parseInt((JSON.stringify(message.createdAt).substring(18,20))) == msg_date1))) {
        console.log('[3]' + JSON.stringify(message.createdAt).substring(18,20));
        const guildMember = message.member;
        const guild = new Discord.Guild();
        guildMember.addRole('339081853745233920');
        _sameAuth = 0;
        var timeout = setTimeout(function() {
          guildMember.removeRole('339081853745233920');
        }, 5000);
      } else {
        _sameAuth = 0;
        msg_date1 = '';
        msg_date2 = '';
        msg_auth1 = '';
        msg_auth2 = '';
      }
        break;
      case 2:
        _sameAuth = 0;
        msg_date1 = '';
        msg_date2 = '';
        msg_auth1 = '';
        msg_auth2 = '';
        break;
      default:
        _sameAuth = 0;
        break;
    }
  }
})

//helper functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
//music bot
const fs = require('fs');
const ytdl = require('ytdl-core')
const streamYT = require('./testyt.js')


var isReady = true;
var _nowPlaying = 1;
var _queue = [];
var _paused = false;
for (k=0;k<50;k++) {
  _queue[k] = '';
}
var i = 0;
var j = 0;

var _rememberDispatcher;

client.on('message', message => {
  function resetQueue() {
    voiceChannel.join().then(connection =>{
      const dispatcher = connection.disconnect();
      })
      for (k=0;k<50;k++) {
        _queue[k] = '';
      }
      i = 0;
      j = 1;
    for (k=50;k>-1;k--) {
      if((fs.existsSync("musicx/audio" + k + ".mp3") === true) && (fs.existsSync("musicx/video" + k + ".mp4"))) {
        console.log('deleted' + k)
        fs.unlink("musicx/audio" + k + ".mp3", function() {
            console.log('deleted mp3');
        })
        fs.unlink("musicx/video" + k + ".mp4", function() {
            console.log('deleted mp4');
        })
      }
    }
    streamYT.reset();
    console.log('queue reset')
  }

  var voiceChannel = message.member.voiceChannel;
  if (isReady && message.content === '//play sex') {
    voiceChannel.join().then(connection =>{
        const dispatcher = connection.playFile('audio/rickroll.mp3');
        dispatcher.on("end", end => {
          voiceChannel.leave();
        });
    }).catch(err => console.log(err));
  }
  if (isReady && message.content === '//play bruh') {
    voiceChannel.join().then(connection =>{
        const dispatcher = connection.playFile('audio/bruh.mp3');
        dispatcher.on("end", end => {
          voiceChannel.leave();
        });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play imout') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/fuckthisimout.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play dun') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/dun.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play smash1') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/lms1.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play smash2') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/lms2.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play smash3') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/lms3.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play yanp') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/yanp.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play what') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/what.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play jcena') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/jcena.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play woo') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/woo.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play wasted') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/wasted.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }
    if (isReady && message.content === '//play fckedup') {
      voiceChannel.join().then(connection =>{
          const dispatcher = connection.playFile('audio/fckedup.mp3');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
      }).catch(err => console.log(err));
    }


    //music player
    function PlayNextInQueue() {
      voiceChannel.join().then(connection =>{
        const dispatcher = connection.playFile('musicx/audio' + j + '.mp3');
        console.log('played next')
        dispatcher.on("end", end => {
          if (!_paused) {
            console.log('j: ' + j);
            if(_queue[j] === '') {
              console.log('resseting queue');
              resetQueue();
              console.log('reset queue done.')
            } else {
              PlayNextInQueue();
              j++;
            }
          } else {
            console.log('waiting for input')
          }
        })
      })
    }

    if (message.content.indexOf('//lpyt ') > -1) {
        i++;
        _queue[i] = message.content.substring(7);
        console.log('my array: ' + JSON.stringify(_queue));
        voiceChannel.join().then(connection =>{
            if(streamYT.toMp3(_queue[i], true).readyState) {
              console.log('started queuing next')
              streamYT.playNext();
              streamYT.toMp3(_queue[i], false)
              console.log('stopped queuing next')
            }
        }).catch(err => console.log(err));
    }

    if (message.content === '//start') {
      var giveM2sec = setTimeout(function() {
      voiceChannel.join().then(connection => {
        //var timeout = setTimeout(function() {
            const dispatcher = connection.playFile('musicx/audio' + j + '.mp3');
            dispatcher.on("end", end => {
              if (!_paused) {
                console.log('playing next')
                j++;
                PlayNextInQueue();
              }
            })
        //}, 5000);
      }).catch(err => console.log(err));
    }, 2000);
    }

    if (message.content === '//stop') {
      resetQueue();
    }

    if (message.content === '//pause') {
      _paused = true;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('musicx/audio' + j + '.mp3');
        dispatcher.pause();
          console.log('tried pausing')
          dispatcher.on("end", end => {
            console.log('paused')
          })
      }).catch(err => console.log(err));
    }

    if (message.content === '//resume') {
      _paused = false;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('musicx/audio' + j + '.mp3');
        dispatcher.resume();
        console.log('resumed')
      }).catch(err => console.log(err));
    }

    if (message.content === '//skip') {
      _paused = false;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('musicx/audio' + j + '.mp3');
        dispatcher.end();
        dispatcher.on("end", end => {
          if (!_paused) {
            console.log('playing next')
            j++;
            PlayNextInQueue();
          }
        })
        console.log('skipped')
      }).catch(err => console.log(err));
    }


})


client.login('token');
