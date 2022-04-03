exports.getDateTime= function () {
    return Date();
};

/*
exports.invertText= function () {
  const Discord = require('discord.js');
  const client = new Discord.Client();
      // Check if the message starts with the `!` trigger \\\\\ message.content.indexOf('//') === 0 &&
      var _reversed = '';
      var text = message.content.substring(9);;
      var i = text.length;
      while (i > 0) {
         _reversed += text.substring(i - 1, i);
          i--;
      }
      return text;
};
*/

exports.getHelp = function() {
  const Discord = require('discord.js');
  const client = new Discord.Client();
      // So the bot doesn't reply to iteself

      return (
        "__**LIST OF COMMANDS**__" + "\n" + "Use prefix: //" + "\n" +
        " //say <text>" + "\n" +
        " //userinfo" + "\n" +
        " //botinfo" + "\n" +
        " //bunnies" + "\n" +
        " //bunnies2" + "\n" +
        " //unicorns" + "\n" +
        " //invert <text>" + "\n" +
        " //dt" + "\n" +
        " //c <text>" + "\n" +
        " //c compliment me" + "\n" +
        " //jokeid <id>" + "\n" +
        " //fortuneteller <question>" + "\n" +
        " //bugreport <text>" + "\n" +
        " --- music player (does not support playlists yet!) --- " + "\n" +
        " lpyt <youtube link>  --- make a queue (you need to use this first)" + "\n" +
        " start ------------------ start the music after you made a queue" + "\n" +
        " stop   ----------------- clear the queue and stop the player" + "\n" +
        " pause  ----------------- pauses the player at current song (doesn't support pause at time yet)" + "\n" +
        " resume ----------------- resumse the player from last song played" + "\n" +
        " skip ------------------- skips current song"
      );
};

exports.getAdminHelp = function() {
  const Discord = require('discord.js');
  const client = new Discord.Client();
      // So the bot doesn't reply to iteself

      return (
        "__**LIST OF COMMANDS**__" + "\n" +
        " //say <text>" + "\n" +
        " //userinfo" + "\n" +
        " //botinfo" + "\n" +
        " //bunnies" + "\n" +
        " //bunnies2" + "\n" +
        " //invert <text>" + "\n" +
        " //dt" + "\n" +
        " //sdt" + "\n" +
        " //c <text>" + "\n" +
        " //c insult <name>" + "\n" +
        " //jokeid <id>" + "\n" +
        " //antispam on-off" + "\n" +
        " //bugreport"
      );
};

exports.beautifyText = function(_letter) {
  switch (_letter) {
      case 'a':
        return ':regional_indicator_a:';
        break;
      case 'b':
        return ':regional_indicator_b:'
        break;
      case 'c':
        return ':regional_indicator_c:'
        break;
      case 'd':
        return ':regional_indicator_d:'
        break;
      case 'e':
        return ':regional_indicator_e:'
        break;
      case 'f':
        return ':regional_indicator_f:'
        break;
      case 'g':
        return ':regional_indicator_g:'
        break;
      case 'h':
        return ':regional_indicator_h:'
        break;
      case 'i':
        return ':regional_indicator_i:'
        break;
      case 'j':
        return ':regional_indicator_j:'
        break;
      case 'k':
        return ':regional_indicator_k:'
        break;
      case 'l':
        return ':regional_indicator_l:'
        break;
      case 'm':
        return ':regional_indicator_m:'
        break;
      case 'n':
        return ':regional_indicator_n:'
        break;
      case 'o':
        return ':regional_indicator_o:'
        break;
      case 'p':
        return ':regional_indicator_p:'
        break;
      case 'q':
        return ':regional_indicator_q:'
        break;
      case 'r':
        return ':regional_indicator_r:'
        break;
      case 's':
        return ':regional_indicator_s:'
        break;
      case 't':
        return ':regional_indicator_t:'
        break;
      case 'u':
        return ':regional_indicator_u:'
        break;
      case 'v':
        return ':regional_indicator_v:'
        break;
      case 'w':
        return ':regional_indicator_w:'
        break;
      case 'x':
        return ':regional_indicator_x:'
        break;
      case 'y':
        return ':regional_indicator_y:'
        break;
      case 'z':
        return ':regional_indicator_z:'
        break;
      case ' ':
        return '    '
        break;
      case '.':
        return '    '
        break;
      case '?':
        return ':grey_question:'
        break;
      case '!':
        return ':grey_exclamation:'
        break;
    default:
    console.log('invalid character')
    break;
  }
}
