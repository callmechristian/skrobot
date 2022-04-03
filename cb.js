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
