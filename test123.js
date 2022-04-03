//base code don't change
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '//';


bot.on('ready', () => {
  console.log('Loaded testbot.');
});




//all test code
//date time function
var dt = require('./textcommands');

bot.on('message', message => {
   if (message.content === prefix + 'dt') {
     message.channel.send( dt.getDateTime() );
   }
});
//---
//get website content function (website specific) cant get it to read
var url = require('url');
var gw = require('./getwebsite');

bot.on('message', message => {
   if (message.content === prefix + 'gw') {
     //message.channel.send( gw.displayCONTENT() );
   }
});
//------------- doesn't work like this
var ver = require('./voice');

bot.on('message', message => {
   if (message.content === prefix + 'vr') {
     message.channel.send( ver.vr() );
     message.channel.send( ver.startvr() );
   }
});
//chatbot----------------------------------

var apiai = require('apiai');
var app = apiai("2379f3fab4cb4cf2abd4fd0e49c71782");
var request = app.textRequest('hi', {
    sessionId: 'session_test123'
});

bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;

    // Check if the message starts with the `!` trigger \\\\\ message.content.indexOf('//') === 0 &&
    if ( message.content.indexOf('//c') === 0 ) {
      // Get the user's message excluding the `!`
        var text = message.content.substring(4);
        // Reply to the user's message
        request = app.textRequest(text, {
          sessionId: 'session_test123'
        });
        request.on('response', function(response) {
            console.log(response);
        });

        request.on('error', function(error) {
            console.log(error);
        });
        request.end();
    }
});

request.end();
//interval test
bot.on('message', message => {
  if(message.content === prefix + 'intest') {
    var interval = setInterval(function(str1, str2) {
      console.log(str1 + " " + str2);
    }, 1000, "Hello.", "How are you?");
  }
})


//antispam
const util = require('util');
var _allowRun = false;
var _sameAuth = 0;
var msg_auth1;
var msg_auth2;
var msg_date1;
var msg_date2;

bot.on('message', message => {
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
        msg_date1 = parseInt(JSON.stringify(message.createdAt).substring(18,20));
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
        guildMember.addRole('340555191663198208');
        _sameAuth = 0;
        var timeout = setTimeout(function() {
          guildMember.removeRole('340555191663198208');
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

//jokes
var joke = require('./joke');
var responseType = 1;
var _byID;
var _jokeLoop = false;
var _jokeID;
var _phase;
var _fail = false;

bot.on('message', message => {
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
    if ((message.content.toLowerCase().indexOf('who') > -1)&&(_phase == 2)) {
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
})
//bug report
var log = require('./log');
bot.on('message', message => {
  if (message.content.substring(0,11) == '//bugreport') {
  var txt_bug = message.content.substring(12);
  var fs = require('fs');
  if (fs.existsSync("bugreport" + log.sdatent()) === false) {
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

//test

var isReady = true;

bot.on('message', message => {
  var voiceChannel = message.member.voiceChannel;
  if (isReady && message.content.indexOf('play') > -1) {
    console.log('try 1');
    voiceChannel.join().then(connection =>{
        const dispatcher = connection.playFile('./audio.mp3');
        dispatcher.on("end", end => {
          voiceChannel.leave();
        });
    }).catch(err => console.log(err));

  }
})

//PhantomJS
bot.login('token');
