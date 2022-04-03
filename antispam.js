exports.stopSpam= function() {
  const Discord = require('discord.js');
  const client = new Discord.Client();
  const prefix = '//';
  const util = require('util');
//  const setIntervalPromise = util.promisify(setInterval);
  var _msgnr;
  clearInterval(interval);
  var interval = setInterval(function() {
    client.on('message', () => {
      if(message.content.indexOf('asd') === 0){
            console.log(message.author);
      }
    });
  }, 1000);

}

//  setTimeoutPromise(40, true).then((value) => {

//  });
